'use strict';

const moment = require("moment");

window.onload = function() {
    createCallendar(moment());

    //先月ボタン押下時
    document.getElementById('preMonth').onclick = function() {
        createCallendar(moment(this.value));
    }

    //来月ボタン押下時
    document.getElementById('nextMonth').onclick = function() {
        createCallendar(moment(this.value));
    }
}

/**
 * カレンダーを表示する。
 * @param momentオブジェクト 
 */
const createCallendar = function(localMoment) {
    //captionを表示
    document.getElementById('caption').innerText = localMoment.format("YYYY年MM月");
    
    //カレンダー初期化
    clearCallendar();

    //当月の日数を取得
    const daysOfMonth = localMoment.daysInMonth();

    //月初の曜日を取得（index.htmlと合わせるために＋1する）
    const firstDayOfManth = localMoment.startOf('month').day() + 1;

    //カレンダーの各セルに日付を表示させる
    let cellIndex = 0;
    for(let i = 1; i < daysOfMonth + 1; i++) {
        if(i === 1) {
            cellIndex += firstDayOfManth;
        } else {
            cellIndex++;
        }
        document.getElementById("cell" + cellIndex).innerText = i;
    }

    //6行目の第1セルが空白なら6行目自体を非表示にする。
    if(document.getElementById("cell36").innerText === "") {
        document.getElementById('row6').style.visibility = "hidden";
    }

    //先月
    document.getElementById('preMonth').value = localMoment.add(-1,'month').format("YYYY-MM");
    //来月(先月のmomentオブジェクトとなっているので＋2ヶ月)
    document.getElementById('nextMonth').value = localMoment.add(2,'month').format("YYYY-MM");
}

/**
 * カレンダーを初期化する
 */
const clearCallendar = function() {
    //6行目を表示させておく
    if(document.getElementById('row6').style.visibility === "hidden") {
        document.getElementById('row6').style.visibility = "visible";
    }
    for(let i = 1; i < 43; i++) {
        document.getElementById("cell" + i).innerText = "";
    }
}