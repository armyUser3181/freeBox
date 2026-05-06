/**
 * Event class holds an event type and a callback function.
 * 이벤트 타입과 콜백 함수를 담는 클래스입니다.
 */
class Event {
  /**
   * @param {string} type
   * @param {function(*): *} callback
   */
  constructor(type, callback) {
    this.type = type;
    this.callback = callback;
  }

  /**
   * Triggers the event callback with the provided payload.
   * @param {*} payload
   * @returns {*}
   */
  trigger(payload) {
    if (typeof this.callback !== 'function') {
      return null;
    }
    return this.callback(payload);
  }
}

export default Event;
