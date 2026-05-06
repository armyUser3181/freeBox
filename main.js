/**
 * Main entry script for block game.
 * 블록 게임 메인 진입 스크립트입니다.
 */
import BlockGame from './BlockGame.js';
import * as lib from './lib.js';

const canvas = document.getElementById('myCanvas');
const game = new BlockGame(canvas);

lib.helloWorldPrint();
game.start();

