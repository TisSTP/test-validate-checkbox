import { FormGroup } from '@angular/forms';

export function logFormValidation(form: FormGroup, sub = '') {
  for (const name in form.controls) {
    const control = form.get(name);
    console.log('#--' + sub + name + '--: ', control.value, control.status, control.errors);
    if ((control as FormGroup).controls) {
      logFormValidation(control as FormGroup, '--');
    }
  }
}
