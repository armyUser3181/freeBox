
import * as lib from "./lib.js"
import Draw from "./DrawClass.js"
import CridElement from "./GridClass.js"
import RectElement from "./RectElement.js"

const draw = new Draw(document.getElementById('myCanvas'));
const grid = new CridElement({ draw });
//grid.drawGridBackground({x: 200, y: 200, cols: 4, rows: 4, width: 300, height: 300, color: 'lightgray'});

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

grid.drawGridElements({x: 200, y: 200, cols: 3, rows: 3, width: 300, height: 300, borderWidth: 2, defaultColor: 'lightgray'});

lib.helloWorldPrint()

