import { FormArray, ValidatorFn } from '@angular/forms';

export class CheckboxValidator {

  static ChooseOneInArray(key: string): ValidatorFn {
    return (fa: FormArray): { [key: string]: boolean } | null => {
      if (fa.value == null || fa.value.length === 0) {
        return (null);
      }

      if (!fa.value.find(x => x[key] === true)) {
        return ({ chooseOneCheckbox: true });
      }

      console.log('find in array: ', fa.value.find(x => x[key] === true));
      return (null);
    };
  }

}
