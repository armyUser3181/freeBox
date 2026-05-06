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
 * Selects an item from an array.
 * 배열에서 하나의 항목을 선택합니다.
 * @param {Array} values
 * @param {number} [index] - optional index; if omitted, select randomly
 * @returns {*}
 */
export function select(values, index) {
    if (!Array.isArray(values) || values.length === 0) {
        return undefined;
    }
    if (typeof index === 'number') {
        return values[index < 0 ? 0 : Math.min(index, values.length - 1)];
    }
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
}

