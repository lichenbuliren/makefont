'use strict'

/**
 * 字体生成插件
 * 运行在对应版本的项目路径下面
 * @type {[type]}
 */
var fs = require('fs'),
    path = require('path'),
    Fontmin = require('fontmin');


module.exports = {

    /**
     * 校验给定的文件或文件目录是否存在，如果不存在
     * @param  {[type]} str 文件目录或路径，可以使用相对路径
     * @return {[type]}      [description]
     */
    validateFilePath: function(str) {
        console.log(str);
        var destPath = path.resolve(process.cwd(), str);

        if (!fs.existsSync(destPath)) {
            console.log('少年，你的文件路径错了，赶紧检查下！！');
            process.exit(1);
        } else {
            return destPath;
        }
    },

    /**
     * 读取字体文件和字体来源文件，输出到dest目录
     * @param  {[type]} fontName ../lib/ 目录下的字体文件名称
     * @param  {[type]} src      根目录下字体来源文件
     * @param  {[type]} dest     压缩之后的目标文件夹
     * @return {[type]}          [description]
     */
    fontmin: function(fontName, src, dest, callback) {
        var strContent = readFileContent(src).join('');
        var fontmin = new Fontmin()
            .src(fontName)
            .use(Fontmin.glyph({
                text: strContent
            }))
            .use(Fontmin.ttf2eot())
            .use(Fontmin.ttf2woff())
            .use(Fontmin.ttf2svg())
            .dest(dest);
        fontmin.run(function(err, files) {
            if (err) {
                throw err;
            } else {
                callback && callback();
            }
        });
    }
}

/**
 * 读取指定路径下的文件内容
 * @param  {string} dir 目标文件夹
 * @return {Array}      返回内容数组
 */
function readFileContent(dir) {
    var contents = [];
    var stats = fs.statSync(dir);
    if (stats.isDirectory(dir)) {
        travel(dir, function(fileList) {
            fileList.forEach(function(filePath) {
                var data = fs.readFileSync(filePath, 'utf-8');
                contents.push(data);
            });
        });
    } else {
        contents.push(fs.readFileSync(dir, 'utf-8'));
    }

    return unique(contents.join('').split(''));
}


/**
 * 遍历文件夹目录
 * @param  {[type]}   dir      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function travel(dir, callback) {
    var fileList = [],
        folderList = [];
    var walk = function(filePath, fileList, folderList) {
        fs.readdirSync(filePath).forEach(function(file) {
            var pathname = path.join(filePath, file);
            var stats = fs.statSync(pathname);
            if (stats.isDirectory()) {
                walk(pathname, fileList, folderList);
                folderList.push(pathname);
            } else {
                fileList.push(pathname);
            }
        });
    }
    walk(dir, fileList, folderList);
    callback && callback(fileList, folderList);
}

/**
 * 数组去重
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function unique(arr) {
    var result = [],
        hash = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!hash[arr[i]]) {
            result.push(arr[i]);
            hash[arr[i]] = true;
        }
    }
    return result;
}