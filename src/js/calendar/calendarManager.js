'use strict';

/**
 * カレンダー管理クラス
 * Calendarオブジェクトの管理を行う。
 */
const CalendarManager = function() { // eslint-disable-line

    /**
     * CalendarオブジェクトをキャッシュしておくMap
     */
    const calendarMap = new Map();

    /**
     * Calendarオブジェクトを作成しキャッシュしておくメソッド
     * すでに生成済みなら何もしない
     */
    this.createCalendar = function(month) {
        let calendar = calendarMap.get(month);
        if(!calendar) {
            calendar = new Calendar(month);
            calendarMap.set(month, calendar);
        }
    };
    
    /**
     * 指定された月のCalendarオブジェクトを返すメソッド
     * キャッシュに無ければ作って返す
     */
    this.getCaldnar = function(month) {
        let r = calendarMap.get(month);
        if(r) {
            return r;
        } else {
            this.createCalendar(month);
            return this.getCaldnar(month);
        }
    };
};
