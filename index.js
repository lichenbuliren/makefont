#!/usr/bin/env node

var makefont = require('./lib');

console.log('start fontmin !');
makefont.progress(makefont.init(process.argv), function() {
  console.log('fontmin success !');
});