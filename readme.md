# データの文字コードと変換について

## Javascript での文字コード

JavaScript ではUTF-16 を利用することが決まってます。HTMLの文字コードがShift_JISやEUCであったとしても、変換されて内部では、UTF-16が使われています。
その点を意識したプログラムを書く必要があります。

## Node.jsで文字コードが分からない、文字コードを変換する

Node.js では標準の状態ではShift_JISなどの文字コードを扱うことが出来ないので、外部モジュールをインストールして利用します。
文字コードの変換には `iconv-lite` と言うライブラリをNode.js様にもモジュールが用意されてますインストールします。
文字コードの自動判定用のモジュールには `jschardet` も用意されてますのでこちらもインストールします。

```bash
npm i -g iconv-lite
npm i -g jschardet
```

`read-unknown.js` と言うプログラムを作成してみます。

```javascript
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
```

以下のコマンドを実行すると、文字コード不明なファイルを読み込みUTF-８に変換して出力します。

```bash
node read-unknown.js
```

```bash
{ encoding: 'EUC-JP', confidence: 0.99 }
舞姫 - 森鴎外 (EUC-JPで保存したテキスト)

　石炭をば早や積み果てつ。中等室の卓のほとりはいと靜にて、熾熱燈しねつとうの光の晴れがましきも徒なり。今宵は夜毎にこゝに集ひ來る骨牌かるた仲間も「ホテル」に宿りて、舟に殘れるは余一人のみなれば。
```