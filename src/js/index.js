'use strict';

//momentモジュール
const moment = require("moment");

// カレンダーをキャッシュしておくMap
let calendarMap = new Map();

// 画面に表示されている月
let currentDispMonth;

window.onload = function() {

    //URL文字列から初期表示の月を取得
    const month = parseURLParam(location.search).month;

    //直近3か月のカレンダー作成
    createLatestCalendar(month);
    //カレンダーの親要素取得
    const root = document.getElementById('calendars');
    //子要素としてパネルを追加
    const callendar = calendarMap.get(month);
    root.appendChild(callendar.getPanel());
    //カレンダー表示
    display(callendar.createContents);

    //先月ボタン押下時
    document.getElementById('preMonth').onclick = function() {
        const localMoment = moment(currentDispMonth);
        const preMonth = localMoment.add(-1,'month').format("YYYY-MM"); 
        const beforPanel = calendarMap.get(currentDispMonth).getPanel();
        const afterCallendar = calendarMap.get(preMonth);
        const afterPanel = afterCallendar.getPanel();
        changePanel(beforPanel, afterPanel, afterCallendar.createContents);
        createLatestCalendar(preMonth);
    };

    //来月ボタン押下時
    document.getElementById('nextMonth').onclick = function() {
        const localMoment = moment(currentDispMonth);
        const nextMonth = localMoment.add(1,'month').format("YYYY-MM"); 
        const beforPanel = calendarMap.get(currentDispMonth).getPanel();
        const afterCallendar = calendarMap.get(nextMonth);
        const afterPanel = afterCallendar.getPanel();
        changePanel(beforPanel, afterPanel, afterCallendar.createContents);
        createLatestCalendar(nextMonth);
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
 * パネルを切り替える
 * @param  beforPanel
 * @param  afterPanel
 * @param  callback パネル切り替え後に実行される関数
 */
function changePanel(beforPanel, afterPanel, callback) {
    //カレンダーの親要素取得
    const root = document.getElementById('calendars');
    //afterPanelでbeforPanelを置き換え
    root.replaceChild(afterPanel, beforPanel);
    display(callback);
}

/**
 * カレンダーを表示する。
 * @param callback 実行される関数
 */
function display(callback) {
    callback();
}

/**
 * 指定した月の直近（当月、先月、来月）のCallendarオブジェクトを作成する。
 * 対象月のCalendarオブジェクトがキャッシュされているならそれを使い回す。
 */
function createLatestCalendar(month) {
    //当月分
    if(!calendarMap.get(month)) {
        const callendar = new Callendar(month);
        callendar.createPanel();
        calendarMap.set(month, callendar);
    }

    const localMoment = moment(month);

    //先月分
    const preMonth = localMoment.add(-1,'month').format("YYYY-MM");
    if(!calendarMap.get(preMonth)) {
        const preCallendar = new Callendar(preMonth);
        preCallendar.createPanel();
        calendarMap.set(preMonth, preCallendar);
    }

    //今月分
    const nextMonth = localMoment.add(2,'month').format("YYYY-MM");
    if(!calendarMap.get(nextMonth)) {
        const nextCallendar = new Callendar(nextMonth);
        nextCallendar.createPanel();
        calendarMap.set(nextMonth, nextCallendar);
    }

}

/**
 * カレンダークラス
 * @param month(YYYY-MM) 
 */
const Callendar = function(month) {

    //コンストラクタ
    this._month = month;
    this._moment = moment(this._month);
    this._panel = {};

    //コールバック関数で利用するのでthisを固定しておく
    const _this = this;

    /**
     * カレンダーのパネルを作成する。
     */
    this.createPanel = function() {
        // カレンダーのパネルを作成
        const panel = document.createElement('div');
        panel.id = 'panel';

        // 子要素にテーブルを追加
        const table = panel.appendChild(document.createElement('table'));
        table.id = 'table';
        table.classList.add('calendar');

        // テーブルにキャプション追加
        const caption = table.appendChild(document.createElement('caption'));
        caption.id = 'caption';

        // ヘッダー追加
        const header = table.appendChild(document.createElement('thead'));

        // ヘッダーのカラムを作成する。
        const headerRow = header.appendChild(document.createElement('tr'));
        headerRow.appendChild(document.createElement('th')).innerText = '日';
        headerRow.appendChild(document.createElement('th')).innerText = '月';
        headerRow.appendChild(document.createElement('th')).innerText = '火';
        headerRow.appendChild(document.createElement('th')).innerText = '水';
        headerRow.appendChild(document.createElement('th')).innerText = '木';
        headerRow.appendChild(document.createElement('th')).innerText = '金';
        headerRow.appendChild(document.createElement('th')).innerText = '土';

        // body作成
        let cellNum = 1;
        for (let i = 1; i < 7; i++) {
            const row = table.appendChild(document.createElement('tr'));
            row.id = 'row' + i;
            for(let j = 1; j < 8; j++) {
                const cell = row.appendChild(document.createElement('td'));
                cell.id = 'cell' + cellNum;
                cellNum++;
            }
        }
        this._panel = panel;
    };

    /**
     * カレンダーの内容を作成する。
     */
    this.createContents = function() {
        const __moment = _this._moment;

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
            document.getElementById('row6').style.display = "none";
        }

        currentDispMonth = _this._month;
    };

    /**
     * パネルを取得する。
     */
    this.getPanel = function() {
        return this._panel;
    };

    /**
     * 月を取得する。
     */
    this.getMonth = function() {
        return this._month;
    };
};