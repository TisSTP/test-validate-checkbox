import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CheckboxValidator } from 'src/app/validators/checkbox-validator';
import { logFormValidation } from 'src/app/validators/log-test-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'test-validate-checkbox';

  inputForm: FormGroup;
  data = [
    {
      contractId: 1,
      contractCode: '11-1111',
      defendants: [
        { name: 'Name A', defendantId: '1' },
        { name: 'Name B', defendantId: '2' },
        { name: 'Name C', defendantId: '3' },
      ]
    }, {
      contractId: 2,
      contractCode: '22-2222',
      defendants: [
        { name: 'Name A', defendantId: '1' },
        { name: 'Name B', defendantId: '2' },
        { name: 'Name C', defendantId: '3' },
      ]
    }, {
      contractId: 3,
      contractCode: '33-3333',
      defendants: [
        { name: 'Name A', defendantId: '1' },
        { name: 'Name B', defendantId: '2' },
        { name: 'Name C', defendantId: '3' },
      ]
    },
  ];

  constructor() {
    this.buildForm();
  }

  trackByContractId(item) {
    return item.contractId;
  }

  trackByDefendantId(defendant) {
    return defendant.defendantId;
  }

  submit() {
    logFormValidation(this.inputForm);
  }

  ngOnDestroy(): void {
  }

  private buildForm() {
    this.inputForm = new FormGroup({
      contractArrs: new FormArray([
        this.addItemContract(),
        this.addItemContract(),
        this.addItemContract(),
      ], CheckboxValidator.ChooseOneInArray('contract'))
    });
  }

  private addItemContract(): FormGroup {
    const formGroup = new FormGroup({
      contract: new FormControl(false),
      defendants: new FormArray([
        this.addItemDefendant(),
        this.addItemDefendant(),
        this.addItemDefendant(),
      ])
    });

    formGroup.get('contract').valueChanges.pipe(untilDestroyed(this)).subscribe(isCheckbox => {
      console.log('value change: ', isCheckbox);
      const defendantForm = formGroup.get('defendants');
      if (isCheckbox) {
        defendantForm.setValidators(CheckboxValidator.ChooseOneInArray('defendantName'));
        defendantForm.enable();
      } else {
        defendantForm.clearValidators();
        defendantForm.reset(false);
        defendantForm.disable();
      }
    });
    return formGroup;
  }

  private addItemDefendant(): FormGroup {
    const formGroup = new FormGroup({
      defendantName: new FormControl(false)
    });
    formGroup.disable();
    return formGroup;
  }

}
