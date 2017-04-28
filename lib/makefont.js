'use strict'

/**
 * 字体生成插件
 * 运行在对应版本的项目路径下面
 * @type {[type]}
 */
var fs = require('fs'),
  path = require('path'),
  Fontmin = require('fontmin');

var glob = require('glob');


module.exports = {

  /**
   * 校验给定的文件或文件目录是否存在，如果不存在
   * @param  {[type]} str 文件目录或路径，可以使用相对路径
   * @return {[type]}      [description]
   */
  validateFilePath: function (str) {
    var destPath = path.resolve(process.cwd(), str);
    if (!fs.existsSync(destPath)) {
      console.error('invalid dir path');
      process.exit(1);
    } else {
      return destPath;
    }
  },

  strToArray: function(str) {
    return str.split(',');
  },

  /**
   * 读取字体文件和字体来源文件，输出到dest目录
   * @param  {[type]} fontName ../lib/ 目录下的字体文件名称
   * @param  {[type]} source      根目录下字体来源文件
   * @param  {[type]} dest     压缩之后的目标文件夹
   * @return {[type]}          [description]
   */
  fontmin: function (fontName, source, dest, callback) {
    //  正则匹配多个源文件目录
    // var strContent = readFileContent(source).join('').trim();
    var strContent = readMulitDirFileContent(source);

    // 判断字体文件是否存在
    var stats = fs.statSync(fontName);
    if (!stats.isFile()) {
      console.error('字体文件不存在，请重新输入');
      return;
    }
    
    var fontmin = new Fontmin()
      .src(fontName)
      .use(Fontmin.glyph({
        text: strContent + '\u000a\u000b\u000c\u000d\u000e\u000f\u0000\u0001'
      }))
      .use(Fontmin.ttf2eot())
      .use(Fontmin.ttf2woff())
      .use(Fontmin.ttf2svg())
      .dest(dest);
    fontmin.run(function (err, files) {
      if (err) {
        throw err;
      } else {
        callback && callback();
      }
    });
  }
}

/**
 * 读取多个目录下的文件内容
 * @param {array} dirs 目录数组
 * @return {String} 返回内容字符串
 */
function readMulitDirFileContent(dirs) {
  var result = '';

  for (var i = 0; i < dirs.length; i++) {
    result += readFileContent(dirs[i]);
  }

  return unique(result.split('')).join('');
}

/**
 * 读取指定路径下的文件内容
 * @param  {string} dir 目标文件夹
 * @return {string}     返回内容文佳夹内所有文件内容
 */
function readFileContent(dir) {
  var contents = [];
  var stats = fs.statSync(dir);
  if (stats.isDirectory(dir)) {
    travel(dir, function (fileList) {
      fileList.forEach(function (filePath) {
        var data = fs.readFileSync(filePath, 'utf-8');
        contents.push(data);
      });
    });
  } else {
    contents.push(fs.readFileSync(dir, 'utf-8'));
  }

  return unique(contents).join('');
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
  var walk = function (filePath, fileList, folderList) {
    fs.readdirSync(filePath).forEach(function (file) {
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