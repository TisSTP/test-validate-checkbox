import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class LoginValidator {

  static MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: FormGroup): { [key: string]: boolean } | null => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  /**
   * - at least 8 characters
   * - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
   * - Can contain special characters
   * - Not whitespace
   */
  static password() {
    // return Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g);
    return Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}');
  }

  static validCitizenId(fc: FormControl) {
    if (fc.value == null || fc.value === '') {
      return (null);
    }

    const val = fc.value;
    let sum = 0;

    if (val.length !== 13) {
      return ({ validCitizenId: true });
    }

    for (let i = 0; i < 12; i++) {
      sum += parseFloat((val.charAt(i))) * (13 - i);
    }

    if ((11 - sum % 11) % 10 !== parseFloat(val.charAt(12))) {
      return ({ validCitizenId: true });
    }

    return (null);
  }
}
