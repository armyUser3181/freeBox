
import SuperElement from "./SuperElement.js";
import ElementContainer from "./ElementContainer.js";
import RectElement from "./RectElement.js";

/**
 * Block class that contains an ElementContainer and arranges RectElements to form shapes.
 * ElementContainer를 가지고 RectElement들을 배치하여 모양을 만드는 Block 클래스입니다.
 */
export class Block extends SuperElement {
    /**
     * @param {Object} params - block parameters
     * @param {string|null} [params.id=null] - identifier
     * @param {number} [params.x=0] - block x coordinate
     * @param {number} [params.y=0] - block y coordinate
     * @param {number} [params.w=0] - block width
     * @param {number} [params.h=0] - block height
     * @param {string} [params.color='gray'] - default block color
     * @param {Object} [params.style={}] - style overrides
     * @param {'fill'|'line'} [params.tag='fill'] - draw mode
     * @param {*} [params.context=null] - extra metadata
     * @param {string} [params.shape='O'] - block shape ('O', 'T', 'L', '+')
     */
    constructor({
        id = null,
        x = 0,
        y = 0,
        w = 100,
        h = 100,
        color = 'gray',
        style = {},
        tag = 'fill',
        context = null,
        shape = 'O',
        draw = null
    } = {}) {
        super({drawInstance: draw, id, x, y, w, h, color, style, tag, context});
        this.container = new ElementContainer({id, x, y, w, h, color, style, tag, context});
        this.shape = shape;
        this.moveState = null;
        this.isLocked = false;
        this.buildShape(shape, draw);
    }

    /**
     * Builds the block shape by adding RectElements to the container.
     * 컨테이너에 RectElement들을 추가하여 블록 모양을 구성합니다.
     * @param {string} shape - shape type
     * @param {Draw|null} draw - Draw instance reference
     */
    buildShape(shape, draw) {
        const rects = this.getShapeRects(shape, draw);
        rects.forEach(rect => {
            this.container.addElement(rect);
        });
    }

    /**
     * Returns RectElement configurations for the given shape.
     * 주어진 모양에 대한 RectElement 설정을 반환합니다.
     * @param {string} shape - shape type
     * @param {Draw|null} draw - Draw instance reference
     * @returns {Array<Object>} array of rect configurations
     */
    getShapeRects(shape, draw) {
        const cellSize = 20; // 각 셀의 크기
        const offsetX = -40; // 블록 중심 기준 오프셋
        const offsetY = -40;

        const shapes = {
            'O': [
                { x: offsetX + 0, y: offsetY + 0, w: cellSize, h: cellSize, color: 'blue' },
                { x: offsetX + cellSize, y: offsetY + 0, w: cellSize, h: cellSize, color: 'blue' },
                { x: offsetX + 0, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'blue' },
                { x: offsetX + cellSize, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'blue' }
            ],
            'T': [
                { x: offsetX + 0, y: offsetY + 0, w: cellSize, h: cellSize, color: 'purple' },
                { x: offsetX + cellSize, y: offsetY + 0, w: cellSize, h: cellSize, color: 'purple' },
                { x: offsetX + cellSize*2, y: offsetY + 0, w: cellSize, h: cellSize, color: 'purple' },
                { x: offsetX + cellSize, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'purple' }
            ],
            'L': [
                { x: offsetX + 0, y: offsetY + 0, w: cellSize, h: cellSize, color: 'orange' },
                { x: offsetX + 0, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'orange' },
                { x: offsetX + 0, y: offsetY + cellSize*2, w: cellSize, h: cellSize, color: 'orange' },
                { x: offsetX + cellSize, y: offsetY + cellSize*2, w: cellSize, h: cellSize, color: 'orange' }
            ],
            '+': [
                { x: offsetX + cellSize, y: offsetY + 0, w: cellSize, h: cellSize, color: 'green' },
                { x: offsetX + 0, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'green' },
                { x: offsetX + cellSize, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'green' },
                { x: offsetX + cellSize*2, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'green' },
                { x: offsetX + cellSize, y: offsetY + cellSize*2, w: cellSize, h: cellSize, color: 'green' }
            ],
            'I': [
                { x: offsetX + cellSize, y: offsetY + 0, w: cellSize, h: cellSize, color: 'cyan' },
                { x: offsetX + cellSize, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'cyan' },
                { x: offsetX + cellSize, y: offsetY + cellSize*2, w: cellSize, h: cellSize, color: 'cyan' },
                { x: offsetX + cellSize, y: offsetY + cellSize*3, w: cellSize, h: cellSize, color: 'cyan' }
            ],
            '-': [
                { x: offsetX + 0, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'cyan' },
                { x: offsetX + cellSize, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'cyan' },
                { x: offsetX + cellSize*2, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'cyan' },
                { x: offsetX + cellSize*3, y: offsetY + cellSize, w: cellSize, h: cellSize, color: 'cyan' }
            ]
        };

        const normalizedShape = (shape || 'O').toUpperCase();
        return (shapes[normalizedShape] || shapes['O']).map(config => new RectElement({ ...config, draw }));
    }

    /**
     * Returns the ElementContainer.
     * ElementContainer를 반환합니다.
     * @returns {ElementContainer}
     */
    getContainer() {
        return this.container;
    }

    /**
     * Returns all RectElement instances inside this block.
     * @returns {RectElement[]}
     */
    getRectElements() {
        return this.container.getElements().filter((element) => element instanceof RectElement);
    }

    /**
     * Returns the axis-aligned bounds for the whole block.
     * @returns {{left:number,right:number,top:number,bottom:number}}
     */
    getBounds() {
        const rects = this.getRectElements();
        if (rects.length === 0) {
            return {
                left: this.x,
                right: this.x,
                top: this.y,
                bottom: this.y
            };
        }

        let left = Infinity;
        let right = -Infinity;
        let top = Infinity;
        let bottom = -Infinity;

        rects.forEach((rect) => {
            const bounds = rect.getBounds({ x: this.x, y: this.y });
            left = Math.min(left, bounds.left);
            right = Math.max(right, bounds.right);
            top = Math.min(top, bounds.top);
            bottom = Math.max(bottom, bounds.bottom);
        });

        return { left, right, top, bottom };
    }

    /**
     * Returns blocks from the given list that collide with this block.
     * @param {Block[]} blocks - other block list
     * @returns {Block[]}
     */
    detectCollisions(blocks = []) {
        return blocks.filter((other) => other && other !== this && this.collidesWithBlock(other));
    }

    /**
     * Checks whether this block collides with another block.
     * @param {Block} otherBlock
     * @returns {boolean}
     */
    collidesWithBlock(otherBlock) {
        if (!otherBlock) {
            return false;
        }

        return this.getRectElements().some((rect) =>
            otherBlock.getRectElements().some((otherRect) =>
                rect.collidesWith(otherRect, { x: this.x, y: this.y }, { x: otherBlock.x, y: otherBlock.y })
            )
        );
    }

    /**
     * Assigns a Move object to this block.
     * @param {Move} move
     * @returns {Block}
     */
    setMove(move) {
        this.moveState = move;
        return this;
    }

    /**
     * Moves the block using the stored Move state.
     * @param {number} [deltaTime=1]
     * @returns {Block}
     */
    applyMove(deltaTime = 1) {
        if (!this.moveState || typeof this.moveState.deltaPosition !== 'function') {
            return this;
        }

        const delta = this.moveState.deltaPosition(deltaTime);
        this.x += delta.x;
        this.y += delta.y;
        if (typeof this.moveState.update === 'function') {
            this.moveState.update(deltaTime);
        }

        return this;
    }

    /**
     * Moves the block with a supplied Move instance.
     * @param {Move} move
     * @param {number} [deltaTime=1]
     * @returns {Block}
     */
    move(move, deltaTime = 1) {
        if (!move || typeof move.deltaPosition !== 'function') {
            return this;
        }

        const delta = move.deltaPosition(deltaTime);
        this.x += delta.x;
        this.y += delta.y;
        if (typeof move.update === 'function') {
            move.update(deltaTime);
        }

        return this;
    }

    /**
     * Locks the block in place.
     * @returns {Block}
     */
    lock() {
        this.isLocked = true;
        this.moveState = null;
        return this;
    }

    /**
     * Decomposes the block into individual RectElements stored in a new Block.
     * 블록을 개별 RectElements로 분해하여 새로운 Block에 저장합니다.
     * @returns {Block}
     */
    decompose() {
        const decomposedBlock = new Block({
            id: `decomposed_${this.id}`,
            x: this.x,
            y: this.y,
            color: this.color,
            tag: this.tag
        });

        this.getRectElements().forEach((rect) => {
            const newRect = new RectElement({
                x: rect.x,
                y: rect.y,
                w: rect.w,
                h: rect.h,
                color: rect.color,
                style: rect.style,
                tag: rect.tag
            });
            decomposedBlock.container.addElement(newRect);
        });

        decomposedBlock.isLocked = true;
        return decomposedBlock;
    }

    /**
     * Draws the block by drawing all elements in the container.
     * 컨테이너의 모든 요소를 그려 블록을 렌더링합니다.
     * @param {Draw} draw - Draw instance
     */
    draw(draw = null) {
        const drawer = draw || this.drawInstance;
        if (!drawer) {
            return;
        }

        this.container.getElements().forEach(element => {
            if (typeof element.draw === 'function') {
                element.draw(drawer, { x: this.x, y: this.y });
                return;
            }

            drawer.rect({
                x: this.x + element.x,
                y: this.y + element.y,
                w: element.w,
                h: element.h,
                color: element.color,
                tag: element.tag,
                style: element.style
            });
        });
    }
}

export default Block;