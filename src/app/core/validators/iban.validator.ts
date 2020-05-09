import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as IBAN from 'iban';


export const IBANValidator = (): ValidatorFn => {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value && !IBAN.isValid(c.value)) {
      return {iban: true};
    }
    return null;
  };
};
