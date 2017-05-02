var makefont = require('./makefont');

// commaner 模块
var program = require('commander');
var fs = require('fs');
var path = require('path');
var sourcePath, destPath, fontPath;

module.exports = {
  init: function(argv) {
    return program.version(require('../package').version)
      .usage('[options]')
      .option('-f, --font <font>', '字体源文件或目录', makefont.validateFilePath)
      .option('-t, --target <target>', '字体生成目录，默认当前目录', '.')
      .option('-s, --source <dirs>', '需要被抽取的文字来源文件或目录, 多个目录以逗号隔开', makefont.strToArray)
      .parse(argv);
  },

  progress: function(program, callback) {
    if (program.font) {
      fontPath = program.font;
    } else {
      console.error('invalid font dir path');
      process.exit(1);
    }

    if (program.source) {
      sourcePath = program.source;
    } else {
      console.error('invalid source dir path');
      process.exit(1);
    }

    if (program.target) {
      destPath = program.target;
    } else {
      destPath = path.resolve(process.cwd(), '.');
    }

    makefont.fontmin(fontPath, sourcePath, destPath, function () {
      callback && callback();
    });
  }
}
