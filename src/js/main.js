'use strict';

// Electronのモジュール
const electron = require("electron");
// Momentのモジュール
const moment = require("moment");

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // 当月をYYYY-MM形式で取得
  const month = moment().format('YYYY-MM');

  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({width: 800, height: 650});
  // 初期表示は当月をパラメータで渡す
  mainWindow.loadURL('file://' + __dirname + '/../view/index.html?month=' + month);

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});