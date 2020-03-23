'use strict';

/**
 * カレンダーを表示するパネル(HTML要素)を作成する関数
 * グローバル関数なのでどこからでも取得できる
 * @return パネル(HTML要素)
 */
window.createPanel = function() {
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
    return panel;
};