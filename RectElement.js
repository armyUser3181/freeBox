import SuperElement from './SuperElement.js';

/**
 * Rectangle element class for canvas rendering.
 * 캔버스 렌더링을 위한 사각형 요소 클래스입니다.
 */
class RectElement extends SuperElement {
  /**
   * Creates a new RectElement instance.
   * 새로운 RectElement 인스턴스를 생성합니다.
   * @param {Object} params - constructor parameters
   * @param {string|null} [params.id=null] - unique identifier / 고유 식별자
   * @param {number} [params.x=0] - x-coordinate / x 좌표
   * @param {number} [params.y=0] - y-coordinate / y 좌표
   * @param {number} [params.w=0] - width / 너비
   * @param {number} [params.h=0] - height / 높이
   * @param {string} [params.color='gray'] - fill color / 채우기 색상
   * @param {Object} [params.style={}] - style overrides / 스타일 재정의
   * @param {'fill'|'line'} [params.tag='fill'] - draw mode / 그리기 모드
   * @param {CanvasRenderingContext2D|null} [params.context=null] - canvas context / 캔버스 컨텍스트
   */
  constructor({
    id = null,
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    color = 'gray',
    style = {},
    tag = 'fill',
    context = null
  } = {}) {
    super({id, x, y, w, h, color, style, tag, context});
  }
}

export default RectElement;
