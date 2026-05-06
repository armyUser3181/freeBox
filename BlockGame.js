import CanvasScene from './CanvasScene.js';
import Move from './Move.js';
import { Block } from './block.js';
import * as lib from './lib.js';

/**
 * BlockGame manages the overall game logic, canvas scene, and blocks.
 * BlockGame은 전체 게임 로직, 캔버스 씬, 블록을 관리합니다.
 */
class BlockGame {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new CanvasScene(canvas);
    this.running = false;
    this.initialize();
  }

  /**
   * Initializes the game with blocks and event listeners.
   * 게임을 블록과 이벤트 리스너로 초기화합니다.
   */
  initialize() {
    this.setupStaticBlocks();
    this.setupMovingBlock();
    this.setupEvents();
  }

  /**
   * Creates static blocks at the top.
   * 상단에 정적 블록들을 생성합니다.
   */
  setupStaticBlocks() {
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
      this.scene.addBlock(block);
    });
  }

  /**
   * Creates the main moving block.
   * 주요 이동 블록을 생성합니다.
   */
  setupMovingBlock() {
    const movingBlock = new Block({
      x: 160,
      y: 260,
      shape: 'I',
      color: 'magenta'
    });
    movingBlock.setMove(new Move({ vx: 40, vy: 0, ax: 10, ay: 0 }));
    this.scene.addBlock(movingBlock);
  }

  /**
   * Sets up all event listeners.
   * 모든 이벤트 리스너를 설정합니다.
   */
  setupEvents() {
    this.scene.setHeader({ title: 'Block Demo', score: 0 });

    this.scene.on('blockMoving', ({ block, previousPosition }) => {
      console.log('block moving:', block.id, 'from', previousPosition, 'to', { x: block.x, y: block.y });
    });

    this.scene.on('blockLocked', ({ block, decomposedBlock, position }) => {
      console.log('block locked at:', position);
      this.scene.setScore(this.scene.header.score + 10);
    });

    this.scene.on('collision', ({ movingBlock: block, collidedBlock, previousPosition }) => {
      console.log('collision detected', block, collidedBlock);
      this.scene.setScore(this.scene.header.score + 1);
      return {
        cancelMove: true,
        snapToOther: true,
        previousPosition
      };
    });
  }

  /**
   * Starts the game.
   * 게임을 시작합니다.
   */
  start() {
    if (this.running) {
      return this;
    }
    this.running = true;
    this.scene.start();
    return this;
  }

  /**
   * Stops the game.
   * 게임을 중지합니다.
   */
  stop() {
    if (!this.running) {
      return this;
    }
    this.running = false;
    this.scene.stop();
    return this;
  }

  /**
   * Resets the game.
   * 게임을 리셋합니다.
   */
  reset() {
    this.stop();
    this.scene.blocks = [];
    this.scene.lockedBlocks = [];
    this.scene.setScore(0);
    this.initialize();
    return this;
  }

  /**
   * Gets the current score.
   * @returns {number}
   */
  getScore() {
    return this.scene.header.score;
  }

  /**
   * Sets the score.
   * @param {number} score
   * @returns {BlockGame}
   */
  setScore(score) {
    this.scene.setScore(score);
    return this;
  }

  /**
   * Gets the game scene.
   * @returns {CanvasScene}
   */
  getScene() {
    return this.scene;
  }
}

export default BlockGame;
