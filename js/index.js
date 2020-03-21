'use strict';

const moment = require("moment");
//ipcモジュール
const ipcRenderer = require("electron").ipcRenderer;

window.onload = function() {

    const month = parseURLParam(location.search).month;

    const callendar = new Callendar(month);
    callendar.show();

    //先月ボタン押下時
    document.getElementById('preMonth').onclick = function() {
        ipcRenderer.sendSync('month',this.value);
    };

    //来月ボタン押下時
    document.getElementById('nextMonth').onclick = function() {
        ipcRenderer.sendSync('month',this.value);
    };
};

/**
 * URLパラメータを分解してkey:valueの形式で返す。
 * @param URL 
 */
function parseURLParam(URL) {
    // URLパラメータを"&"で分離する
	const params = URL.substr(1).split('&');
 
	var paramsArray = [];
	var keyAndValue = null;
 
	for(var i = 0 ; i < params.length ; i++) {
		// "&"で分離したパラメータを"="で再分離
		keyAndValue = params[i].split("=");
 
		// パラメータを連想配列でセット
		paramsArray[keyAndValue[0]] = keyAndValue[1];
	}
 
	// 連想配列パラメータを返す
	return paramsArray;
}

/**
 * カレンダークラス
 * @param month(YYYY-MM) 
 */
const Callendar = function(month) {

    //コンストラクタ
    this._moment = moment(month);

    /**
     * カレンダーを表示する。
     */
    this.show = function() {
        const __moment = this._moment;

        //captionを表示
        document.getElementById('caption').innerText = __moment.format("YYYY年MM月");

        //当月の日数を取得
        const daysOfMonth = __moment.daysInMonth();

        //月初の曜日を取得（index.htmlと合わせるために＋1する）
        const firstDayOfManth = __moment.startOf('month').day() + 1;

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
        document.getElementById('preMonth').value = __moment.add(-1,'month').format("YYYY-MM");
        //来月(先月のmomentオブジェクトとなっているので＋2ヶ月)
        document.getElementById('nextMonth').value = __moment.add(2,'month').format("YYYY-MM");
        
    };
};