/**
 * Main entry script for grid drawing demo.
 * 그리드 드로잉 데모의 메인 진입 스크립트입니다.
 */
import * as lib from "./lib.js";
import CanvasScene from "./CanvasScene.js";
import Move from "./Move.js";
import { Block } from "./block.js";

const canvas = document.getElementById('myCanvas');
const scene = new CanvasScene(canvas);

lib.helloWorldPrint();

const shapes = ['O', 'T', 'L', '+', 'I', '-'];
const colors = {
  O: 'blue',
  T: 'purple',
  L: 'orange',
  '+': 'green',
  I: 'cyan',
  '-': 'cyan'
};

shapes.forEach((shape, index) => {
  const block = new Block({
    x: 80 + index * 100,
    y: 100,
    shape,
    color: colors[shape]
  });
  scene.addBlock(block);
});

const movingBlock = new Block({
  x: 160,
  y: 260,
  shape: 'I',
  color: 'magenta'
});
movingBlock.setMove(new Move({ vx: 40, vy: 0, ax: 10, ay: 0 }));
scene.addBlock(movingBlock);

scene.setHeader({ title: 'Block Demo', score: 0 });
scene.on('collision', ({ movingBlock: block, collidedBlock, previousPosition }) => {
  console.log('collision detected', block, collidedBlock);
  scene.setScore(scene.header.score + 1);
  return {
    cancelMove: true,
    snapToOther: true,
    previousPosition
  };
});

scene.start();

