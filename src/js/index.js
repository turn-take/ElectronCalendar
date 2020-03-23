'use strict';

/**
 * カレンダー画面の表示・切り替えの処理
 * および各種イベント発火に伴う処理を実行するモジュール
 * index.htmlに紐づく想定
 */

//momentモジュール
const moment = require("moment");

// 画面に表示されている月(YYYY-MM)
let currentDispMonth;

//Calendarオブジェクト管理用
let calendarManager;

window.onload = function() {

    //URL文字列から初期表示の月を取得
    const month = parseURLParam(location.search).month;

    //CalendarManager生成
    calendarManager = new CalendarManager();

    //初期表示の月から直近3か月のカレンダー作成
    createLatestCalendar(month);

    //カレンダーの親要素取得
    const root = document.getElementById('calendars');

    //初期表示の月のCalendarオブジェクト取得
    const callendar = calendarManager.getCaldnar(month);
    
    //カレンダー表示
    displayCalendar(root, callendar);



    /********** 以下はイベント処理 ***********/

    //先月ボタン押下時
    document.getElementById('preMonth').onclick = function() {
        //現在画面に表示されている月からmomentオブジェクト取得
        const currentMoment = moment(currentDispMonth);
        //先月のCalendarオブジェクト取得
        const preMonth = currentMoment.add(-1,'month').format("YYYY-MM"); 
        const preCalendar = calendarManager.getCaldnar(preMonth);
        changeCalendar(root, getCurrentDisplayCalendar(), preCalendar);
        createLatestCalendar(preMonth);
    };

    //来月ボタン押下時
    document.getElementById('nextMonth').onclick = function() {
        //現在画面に表示されている月からmomentオブジェクト取得
        const currentMoment = moment(currentDispMonth);
        //来月のCalendarオブジェクト取得
        const nextMonth = currentMoment.add(1,'month').format("YYYY-MM"); 
        const nextCalendar = calendarManager.getCaldnar(nextMonth);
        changeCalendar(root, getCurrentDisplayCalendar(), nextCalendar);
        createLatestCalendar(nextMonth);
    };
};

/**
 * URLパラメータを分解してkey:valueの形式で返す関数
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
 * カレンダーを切り替える関数
 * @param root 親要素
 * @param  beforCalendar 切り替え前Calendarオブジェクト
 * @param  afterCalendar 切り替え後Calendarオブジェクト
 */
function changeCalendar(root, beforCalendar, afterCalendar) {
    root.replaceChild(afterCalendar.getPanel(), beforCalendar.getPanel());
    //切り替え後カレンダーの内容表示
    afterCalendar.createContents((month) => {
        setCurrentDispMonth(month);
    });
}

/**
 * カレンダーを表示する関数
 * 引数に渡されたCalendarオブジェクトが持つパネルの表示と内容の作成を行う
 * @param root 親要素
 * @param calendar 表示させたいCalendarオブジェクト
 */
function displayCalendar(root, calendar) {
    root.appendChild(calendar.getPanel());
    calendar.createContents((month) => {
        setCurrentDispMonth(month);
    });
}

/**
 * 指定した月の直近（当月、先月、来月）のCallendarオブジェクトを作成する関数
 * @param month 月
 */
function createLatestCalendar(month) {
    // 先月分
    createRangeCalendar(month, -1);
    // 来月分
    createRangeCalendar(month, 1);
}

/**
 * 基準月から指定した期間分（基準月を含む）のCalendarオブジェクトを作成する関数
 * 第二引数がプラスなら基準月から未来、マイナスなら過去分になる。
 * @param {*} month 基準月
 * @param {*} term 期間 
 */
function createRangeCalendar(month, term) {
    const localMoment = moment(month);

    let ope = (term < 0) ? -1 : 1; 

    let abs = Math.abs(term);
    for(let i = 0; i < abs + 1; i++) {
        const targetMonth = localMoment.add((i * ope), 'month').format('YYYY-MM');
        calendarManager.createCalendar(targetMonth);
    }
}

/**
 * 画面に表示する月をセットする関数
 */
function setCurrentDispMonth(month) {
    currentDispMonth = month;
}


/**
 * 現在画面に表示されている月のCalendarオブジェクトを取得する関数
 */
function getCurrentDisplayCalendar() {
    return calendarManager.getCaldnar(currentDispMonth);
}