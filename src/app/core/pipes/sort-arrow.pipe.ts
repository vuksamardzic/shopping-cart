import {Pipe, PipeTransform} from '@angular/core';
import {SortOrderEnum} from '../enums/sort-order.enum';

@Pipe({
  name: 'sortArrow'
})
export class SortArrowPipe implements PipeTransform {

  transform(value: SortOrderEnum, ...args: unknown[]): string {
    if (value) {
      if (value === SortOrderEnum.ASC) {
        return '↑';
      } else {
        return '↓';
      }
    }
    return '';
  }

}
