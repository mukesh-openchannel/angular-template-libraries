import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'oc-form',
  templateUrl: './oc-form.component.html',
  styleUrls: ['./oc-form.component.scss']
})
export class OcFormComponent implements OnInit {

  /**
   * JSOM with all form data to generate dynamic form
   */
  @Input() formJsonData: any;
  /**
   * Returning all form fields value to the parent component
   */
  @Output() formSubmitted = new EventEmitter<any>();

  public customForm: FormGroup;
  public formData: any;

  constructor() { }

  ngOnInit(): void {
    this.generateForm();
  }

  /**
   * Generating form by JSON data
   */
  generateForm(): void {
    const group = {};
    if (this.formJsonData?.fields) {
      this.formJsonData?.fields.forEach(inputTemplate => {
        switch (inputTemplate?.type) {
          case 'text':
          case 'richText':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : '');
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          case 'dropdownList':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : '');
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          case 'tags':
            group[inputTemplate?.id] = new FormControl(inputTemplate?.defaultValue ?
              inputTemplate?.defaultValue : ['']);
            this.setValidators(group[inputTemplate?.id], inputTemplate?.attributes);
            break;
          default:
            break;
        }
      });
      this.customForm = new FormGroup(group);
    }
  }
  /**
   * Setting validators array to the chosen control
   */
  setValidators(control: AbstractControl, attributes): void {
    const validators: ValidatorFn [] = [];
    Object.keys(attributes).forEach(key => {
      switch (key) {
        case 'required':
          if (attributes.required) {
            validators.push(Validators.required);
          }
          break;
        case 'maxChars':
          if (attributes.maxChars) {
            validators.push(Validators.maxLength(attributes.maxChars));
          }
          break;
        case 'minChars':
          if (attributes.minChars) {
            validators.push(Validators.minLength(attributes.minChars));
          }
          break;
        case 'minCount':
          if (attributes.minCount) {
            validators.push(Validators.minLength(attributes.minCount));
          }
          break;
        case 'maxCount':
          if (attributes.maxCount) {
            validators.push(Validators.maxLength(attributes.maxCount));
          }
          break;
        default:
          break;
      }
    });
    control.setValidators(validators);
  }

  trackByFieldId(index: number, formElement: any): string {
    return formElement.id;
  }

  /**
   * Output event which returns form value
   */
  sendData(): void {
    this.formSubmitted.emit(this.customForm.getRawValue());
  }
}
