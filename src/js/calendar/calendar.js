'use strict';

/**
 * カレンダークラス
 * カレンダーの内容の作成を行う
 * @param month(YYYY-MM) 
 */
let Calendar = function(month) { // eslint-disable-line

    //コンストラクタ
    const _month = month;
    const _moment = moment(_month);
    const _panel = createPanel();

    /**
     * カレンダーの内容を作成するメソッド
     * @param callback 画面の表示月を設定するコールバック関数
     */
    this.createContents = function(callback) {
        //captionを表示
        document.getElementById('caption').innerText = _moment.format("YYYY年MM月");

        //当月の日数を取得
        const daysOfMonth = _moment.daysInMonth();

        //月初の曜日を取得（index.htmlと合わせるために＋1する）
        const firstDayOfManth = _moment.startOf('month').day() + 1;

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
        callback(month);
    };

    /**
     * パネル(HTML要素)を取得するメソッド
     */
    this.getPanel = function() {
        return _panel;
    };

    /**
     * 月を取得するメソッド
     */
    this.getMonth = function() {
        return _month;
    };
};