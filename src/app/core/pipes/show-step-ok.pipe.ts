import {Pipe, PipeTransform} from '@angular/core';
import {CartItemModel} from "../model/cart-item.model";
import {FormGroup} from "@angular/forms";


const valid = (control: string, form: FormGroup): boolean => {
  return form.get(control).valid;
};

@Pipe({
  name: 'showStepOK'
})
export class ShowStepOKPipe implements PipeTransform {

  transform(step: number, form: FormGroup, items: CartItemModel[], data: any): boolean {
    switch (step) {
      case 1:
        return !!items.length;
      case 2:
        return !!items.length && valid('firstName', form) && valid('lastName', form) && valid('phone', form);
      case 3:
        return !!items.length && valid('firstName', form) && valid('lastName', form) && valid('phone', form) && valid('accountOwner', form) && valid('iban', form);
      case 4:
        return !!items.length && valid('firstName', form) && valid('lastName', form) && valid('phone', form) && valid('accountOwner', form) && valid('iban', form);
    }
    return false;
  }
}
