export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // Уведомлять слушателей
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }
  // Подписаться на уведомление
  // Добавляем нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
            this.listeners[event].filter(listener => listener !== fn)
    }
  }
}
