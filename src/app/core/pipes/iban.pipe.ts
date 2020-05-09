import {Pipe, PipeTransform} from '@angular/core';
import * as IBAN from 'iban';

@Pipe({
  name: 'iban'
})
export class IbanPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (IBAN.isValid(value)) {
      return IBAN.printFormat(value, ' ');
    }
    return value;
  }
}
