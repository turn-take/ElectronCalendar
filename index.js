'use strict';

const moment = require("moment");

window.onload = function() {
    //captionを表示
    document.getElementById('caption').innerText = moment().format("YYYY年MM月");
    
    //当月の日数を取得
    const daysOfMonth = moment().daysInMonth();

    //月初の曜日を取得（index.htmlと合わせるために＋1する）
    const firstDayOfManth = moment().startOf('month').day() + 1;

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
}