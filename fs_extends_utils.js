#!/usr/bin/env node

var fs = require('fs'),
    path = require('path');

/* 
** Windows: '\\' 
** Unix: '/' 
**/
var sep = path.sep;

/* expends utils for creating cascade directories */
var mkdircSync = exports.mkdircSync = function (arg) {
  arg = arg || process.argv[2];
  var reg_1 = new RegExp(".*(\\" + sep + ".*)$"),
      reg_2 = new RegExp("(.*)(\\" + sep + "[^\\" + sep + "\\\s]*?)$");
  (function (dir) {
    if (!dir) 
      return;
    if (fs.existsSync(dir)) 
      return;
    if (!reg_1.exec(dir)) 
      return fs.mkdirSync(dir);
    arguments.callee(reg_2.exec(dir)[1]);
    fs.mkdirSync(dir);
  })(arg);
};

/* judge the given arg is a directory or file */
var isDirSync = exports.isDirSync = function (arg) {
  arg = arg || process.argv[2];
  return fs.statSync(dir).isDirectory();
};

/* expends utils for remove file / directory / cascade directories */
var rmdircSync = exports.rmdircSync = function (arg) {
  arg = arg || process.argv[2];

  (function (dir) {
    if (!dir) return;
    if (!fs.existsSync(dir)) return;
    if (!isDirSync(dir)) return fs.unlinkSync(dir);
    var fname = arguments.callee;
    fs.readdirSync(dir).forEach(function (sub_dir) {
      if (!sub_dir) return;
      fname(dir + sep + sub_dir);
    });
    fs.rmdirSync(dir);
  })(arg);
};
