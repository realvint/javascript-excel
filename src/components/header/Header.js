import {ExelComponent} from '@core/ExelComponent';
import {$} from "@core/dom";
import {changeTitle} from "@/redux/actions";
import {defaultTitle} from "@/constants";
import {debounce} from "@core/utils";
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Header extends ExelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" value="${title}" class="input" />
            <div>
                <div class="button" data-button="remove">
                    <span 
                      class="material-icons" data-button="remove">delete
                    </span>
                </div>
                <div class="button" data-button="exit">
                    <span 
                      class="material-icons" data-button="exit">exit_to_app
                    </span>
                </div>
            </div>
    `
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const decision = confirm('Are you sure?')
      if (decision) {
        localStorage.removeItem('excel:' +ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
