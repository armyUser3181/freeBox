export function helloWorldPrint() {
    console.log("hello world")
    const helloWorldElement = document.createElement("p")
    helloWorldElement.textContent = "hello world"
    helloWorldElement.style.position = "fixed"
    helloWorldElement.style.left = "60px"
    helloWorldElement.style.top = "25px"
    helloWorldElement.style.fontSize = "xx-large";
    document.body.appendChild(helloWorldElement)
    return { 
        message: "hello world",
        element: helloWorldElement,
        error: false,
     }
}

export function buildGrid(grid, elements) {
  // elements 형식: { b11, b12, b13, b21, b22, b23, b31, b32, b33 }
  // 또는 2D 배열: [[el00, el01, el02], [el10, el11, el12], [el20, el21, el22]]
  
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