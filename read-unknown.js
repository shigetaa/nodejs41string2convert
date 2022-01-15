// ファイルを操作
var fs = require('fs');
// 文字コードの変換
var iconv = require('iconv-lite');
// 文字コードの自動判定
var jschardet = require('jschardet');

// 文字コードが分からないファイルを読み込む
var str = fs.readFileSync('sample-unknown.txt');
// 文字コード判定を行う
var det = jschardet.detect(str);
console.log(det);
//console.log(str);
// iconv-lite で UTF-8 に変換する
str = iconv.decode(str, det.encoding);
console.log(str);