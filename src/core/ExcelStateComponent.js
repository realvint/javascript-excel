import {ExelComponent} from "@core/ExelComponent"

export class ExcelStateComponent extends ExelComponent {
  constructor(...args) {
    super(...args)
  }
  get template() {
    return JSON.stringify(this.state, null, 4)
  }
  initState(initialState = {}) {
    this.state = {...initialState}
  }
  setState(newState) {
    this.state = {...this.state, ...newState}
    this.$root.html(this.template)
  }
}
