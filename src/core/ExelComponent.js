import {DomListener} from '@core/DomListener';

export class ExelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }
  // Настраиваем наш компонент до инициализации
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  // Инициализация компонента
  // Добавляем DOM слушателей
  init() {
    this.initDOMlisteners()
  }
  // Удаляем компонент
  // Удаляем слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
