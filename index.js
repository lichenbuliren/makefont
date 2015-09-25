#!/usr/bin/env node

// commaner 模块
var program = require('commander');
var makefont = require('./lib/makefont');

var path = require('path');



program.version('0.0.1')
    .usage('<fontname>')
    .option('-t, --font <font>', '指定字体文件路径',
        makefont.validateFilePath)
    .option('-s, --src [src]', '指定需要被抽取的文字来源文件目录路径', makefont.validateFilePath)
    .option('-d, --desc', '指定生成字体文件的目标路径', './dest')
    .parse(process.argv);

var fontPath,
    src = './src',
    dest = path.resolve(process.cwd(), './dest');
if (program.font) {
    fontPath = program.font;
    console.log(program.font);
} else {
    fontPath = path.resolve(process.cwd(), 'lib', program.args[0]);
    console.log(fontPath);
}
if (program.src) {
    src = program.src;
    console.log(src);
} else {
    src = path.resolve(process.cwd(), program.args[1] ? program.args[1] : src);
    console.log(src);
}

makefont.fontmin(fontPath, src, dest, function() {
    console.log('恭喜！，字体文件生成完毕。');
});