
깃허브 코파일럿 사용했는데 개신기하네

# Canvas Block System

Canvas를 사용하여 블록 기반 UI를 구축하는 시스템입니다.

## 📁 파일 구조

### 1. **DrawClass.js** - 기본 드로우 클래스
```javascript
class Draw {
  constructor(canvas)
  rect({x, y, w, h, color, tag = 'fill'})
}
```

**기능:**
- Canvas의 2D context를 관리
- 직사각형 그리기 (fill, line)
- 중앙 기준 좌표 시스템

**주요 특징:**
- 중앙 좌표 (x, y)를 기준으로 동작
- 좌상단 좌표로 자동 변환하여 canvas에 그림

**사용 예시:**
```javascript
const draw = new Draw(canvas);
draw.rect({x: 150, y: 150, w: 100, h: 100, color: 'blue', tag: 'fill'});
```

---

### 2. **RectElement.js** - 직사각형 요소
```javascript
class RectElement extends SuperElement {
  constructor({id, x, y, w, h, color, style, tag, context})
}
```

**속성:**
- `id`: 요소의 고유 식별자 (string|null)
- `x`: x 좌표 (number)
- `y`: y 좌표 (number)
- `w`: 너비 (number)
- `h`: 높이 (number)
- `color`: 채우기 색상 (string, 기본값: 'gray')
- `style`: 스타일 재정의 (Object, 기본값: {})
- `tag`: 그리기 모드 ('fill'|'line', 기본값: 'fill')
- `context`: 캔버스 컨텍스트 (CanvasRenderingContext2D|null)

**역할:**
- SuperElement를 상속받는 직사각형 요소 클래스
- 블록을 구성하는 기본 요소
- 위치, 크기, 색상, 스타일 정보 포함

**사용 예시:**
```javascript
const element = new RectElement({
  id: 'cell1', 
  x: 50, 
  y: 50, 
  w: 100, 
  h: 100, 
  color: 'red', 
  tag: 'fill'
});
```

---

### 3. **ElementContainer.js** - 요소 컨테이너
```javascript
class ElementContainer extends SuperElement {
  constructor({id, x, y, w, h, color, style, tag, context, elements})
  addElement(element)
  getElements()
  removeElement(predicate)
}
```

**기능:**
- 요소의 위치 정보 관리
- 실제 요소(element) 참조
- 요소 추가, 조회, 제거

**구조:**
```
ElementContainer
├─ elements (Array) - 포함된 요소들
└─ SuperElement 속성들 (x, y, w, h, etc.)
```

**사용 예시:**
```javascript
const container = new ElementContainer({x: 100, y: 100});
container.addElement(rectElement);
```

---

### 4. **block.js** - 블록 클래스
```javascript
class Block extends SuperElement {
  constructor({id, x, y, w, h, color, style, tag, context, shape})
  buildShape(shape)
  getShapeRects(shape)
  getContainer()
  draw(draw)
}
```

**기능:**
- ElementContainer를 가지고 RectElement들을 배치하여 모양 생성
- 다양한 블록 모양 지원 ('O', 'T', 'L', '+')
- 블록 렌더링

**모양 예시:**
- 'O': 2x2 정사각형
- 'T': T자 모양
- 'L': L자 모양
- '+': 십자 모양

**사용 예시:**
```javascript
const block = new Block({x: 150, y: 150, shape: 'T'});
block.draw(draw);
```

---

### 5. **lib.js** - 유틸리티 함수

#### `buildGrid(grid, elements)`
그리드에 요소 배치하는 함수

**파라미터:**
- `grid`: Grid 인스턴스
- `elements`: 객체 형식 또는 2D 배열

**지원 형식:**

1. **객체 형식:**
```javascript
buildGrid(grid, {
  b11: element1, b12: element2, b13: element3,
  b21: element4, b22: element5, b23: element6,
  b31: element7, b32: element8, b33: element9
});
```

2. **2D 배열 형식:**
```javascript
buildGrid(grid, [
  [element1, element2, element3],
  [element4, element5, element6],
  [element7, element8, element9]
]);
```

---

## 🚀 사용 흐름

### 1. 기본 셋업
```javascript
import Draw from './DrawClass.js';
import { Block } from './block.js';
import RectElement from './RectElement.js';

const canvas = document.getElementById('canvas');
const draw = new Draw(canvas);
```

### 2. 블록 생성
```javascript
const block1 = new Block({x: 100, y: 100, shape: 'O', color: 'blue'});
const block2 = new Block({x: 200, y: 200, shape: 'T', color: 'purple'});
```

### 3. 렌더링
```javascript
block1.draw(draw);
block2.draw(draw);
```

---

## 📊 좌표 시스템

**중앙 기준 좌표 (Center-based coordinate)**
- 모든 좌표는 도형의 중앙을 기준으로 설정
- Canvas API의 좌상단 기준에서 자동 변환

```
(0, 0) = Canvas 중앙
(150, 150) = Canvas 중앙에서 우측 150, 하단 150
```

---

## 🔧 현재 기능

✅ Canvas 기반 도형 그리기
✅ RectElement 클래스 주석 및 문서화 (속성, 영어/한글 주석)
✅ ElementContainer 클래스 개선 (요소 관리)
✅ Block 클래스 구현 (ElementContainer를 활용한 모양 생성)
✅ 다양한 블록 모양 지원 ('O', 'T', 'L', '+')

---

## 🎯 다음 진행 사항 (예정)

- [ ] 블록 이동 및 회전 기능 추가
- [ ] 블록 충돌 감지
- [ ] 게임 루프 구현 (블록 떨어짐)
- [ ] 점수 시스템
- [ ] 레벨 및 난이도 조절
