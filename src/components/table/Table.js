import {ExelComponent} from '@core/ExelComponent';
import {createTable} from "@/components/table/table.template";

export class Table extends ExelComponent {
  static className = 'excel__table'
  toHTML() {
    return createTable(25)
  }
}
