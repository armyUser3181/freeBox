
깃허브 코파일럿 사용했는데 개신기하네

# Canvas Grid System

Canvas를 사용하여 그리드 기반 UI를 구축하는 시스템입니다.

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

### 2. **GridClass.js** - 그리드 관리 클래스
```javascript
class Grid {
  constructor(draw)
  addElement(element)
  drawGridLines({x, y, cols, rows, width, height, borderWidth, color})
  drawGridBackground({x, y, cols, rows, width, height, borderWidth, color})
}
```

**기능:**
- 그리드 라인 그리기
- 그리드 배경 그리기 (테두리 제외)
- 요소(element) 저장 및 관리

**파라미터 기본값:**
- `cols, rows`: 3x3
- `width, height`: 120x120
- `borderWidth`: 1px
- `x, y`: 0, 0 (중앙 기준)

**사용 예시:**
```javascript
const grid = new Grid(draw);
grid.drawGridBackground({x: 150, y: 150, width: 300, height: 300, color: 'white'});
grid.drawGridLines({x: 150, y: 150, width: 300, height: 300, color: 'black'});
```

---

### 3. **RectElement.js** - 직사각형 요소
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
- 그리드 셀에 배치될 실제 요소
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

### 4. **ElementContainer.js** - 요소 컨테이너
```javascript
class ElementContainer {
  constructor({row, col, element})
  setPosition(row, col)
  getPosition()
  getElement()
  setElement(element)
}
```

**기능:**
- 요소의 위치 정보 관리 (row, col)
- 실제 요소(element) 참조

**구조:**
```
ElementContainer
├─ row, col (그리드 내 위치)
└─ element (RectElement 등 실제 요소)
```

**사용 예시:**
```javascript
const container = new ElementContainer({row: 1, col: 1, element});
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
import Grid from './GridClass.js';
import RectElement from './RectElement.js';
import { buildGrid } from './lib.js';

const canvas = document.getElementById('canvas');
const draw = new Draw(canvas);
const grid = new Grid(draw);
```

### 2. 요소 생성
```javascript
const el1 = new RectElement({id: 'a', color: 'red'});
const el2 = new RectElement({id: 'b', color: 'blue'});
// ... 더 많은 요소
```

### 3. 그리드 배치
```javascript
buildGrid(grid, {
  b11: el1,
  b22: el2
  // 나머지는 자동으로 null 처리
});
```

### 4. 렌더링
```javascript
grid.drawGridBackground({x: 150, y: 150, width: 300, height: 300});
grid.drawGridLines({x: 150, y: 150, width: 300, height: 300});
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
✅ 3x3 그리드 시스템
✅ 그리드 라인 렌더링
✅ 그리드 배경 렌더링 (테두리 제외)
✅ 요소 저장 및 관리
✅ 요소 위치 추적 (ElementContainer)
✅ 빌더 패턴을 통한 편의성
✅ RectElement 클래스 주석 및 문서화 (속성, 영어/한글 주석)

---

## 🎯 다음 진행 사항 (예정)

- [ ] 요소 렌더링 함수 추가
- [ ] 마우스 상호작용 추가
- [ ] 요소 클릭 이벤트 처리
- [ ] 드래그 & 드롭 구현
- [ ] 애니메이션 효과 추가
