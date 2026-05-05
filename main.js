/**
 * Main entry script for grid drawing demo.
 * 그리드 드로잉 데모의 메인 진입 스크립트입니다.
 */
import * as lib from "./lib.js";
import Draw from "./DrawClass.js";
import CridElement from "./GridClass.js";
import RectElement from "./RectElement.js";

const draw = new Draw(document.getElementById('myCanvas'));
const grid = new CridElement({ draw });

// Build grid elements and add them to the container.
// 그리드 요소를 생성하여 컨테이너에 추가합니다.
lib.buildGrid(grid, {
  b11: new RectElement({id: 'b11', color: 'red'}),
  b12: new RectElement({id: 'b12', color: 'blue'}),
  b13: new RectElement({id: 'b13', color: 'green'}),
  b21: new RectElement({id: 'b21', color: 'yellow'}),
  b22: new RectElement({id: 'b22', color: 'purple'}),
  b23: new RectElement({id: 'b23', color: 'orange'}),
  b31: new RectElement({id: 'b31', color: 'pink'}),
  b32: new RectElement({id: 'b32', color: 'cyan'}),
  b33: new RectElement({id: 'b33', color: 'lime'})
});

// Render the grid contents.
// 그리드 내용을 렌더링합니다.
grid.drawGridElements({x: 200, y: 200, cols: 3, rows: 3, width: 300, height: 300, borderWidth: 2, defaultColor: 'lightgray'});

lib.helloWorldPrint();

