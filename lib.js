/**
 * Prints a simple hello world message and attaches a paragraph to the DOM.
 * 간단한 헬로 월드 메시지를 출력하고 DOM에 단락을 추가합니다.
 * @returns {{message: string, element: HTMLParagraphElement, error: boolean}}
 */
export function helloWorldPrint() {
    console.log("hello world");
    const helloWorldElement = document.createElement("p");
    helloWorldElement.textContent = "hello world";
    helloWorldElement.style.position = "fixed";
    helloWorldElement.style.left = "60px";
    helloWorldElement.style.top = "25px";
    helloWorldElement.style.fontSize = "xx-large";
    document.body.appendChild(helloWorldElement);
    return {
        message: "hello world",
        element: helloWorldElement,
        error: false,
     };
}

/**
 * Builds the grid by adding elements into grid cells.
 * 요소를 그리드 셀에 추가하여 그리드를 구성합니다.
 * @param {Object} grid - CridElement instance
 * @param {Object|Array} elements - cell values in object or 2D array form
 */
export function buildGrid(grid, elements) {
  // elements format: { b11, b12, b13, b21, b22, b23, b31, b32, b33 }
  // or 2D array: [[el00, el01, el02], [el10, el11, el12], [el20, el21, el22]]
  const elementArray = Array.isArray(elements) ? elements : [
    [elements.b11, elements.b12, elements.b13],
    [elements.b21, elements.b22, elements.b23],
    [elements.b31, elements.b32, elements.b33]
  ];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const element = elementArray[row][col];
      if (element && typeof grid.addElement === 'function') {
        grid.addElement(row, col, element);
      }
    }
  }

  return grid;
}