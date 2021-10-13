import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { AppFormField, AppFormModel } from '../model/app-form-model';
import { FormProgressbarStep } from '../model/progress-bar-item.model';
import { OcFormGenerator } from '../oc-form/oc-form-generator';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { ErrorMessageFormId } from '@openchannel/angular-common-components/src/lib/common-components';

export interface FieldStep {
    label?: AppFormField;
    items?: AppFormField[];
}

export type FormType = 'wizard' | 'page';

class OcFormGroup extends FormGroup {
    label: AppFormField;
    formConfig: AppFormModel = {
        fields: [],
    };

    constructor(label: AppFormField, formConfig: AppFormField[], controls: { [p: string]: AbstractControl }) {
        super(controls);
        this.label = label;
        this.formConfig.fields = [...formConfig];
    }
}

@Component({
    selector: 'oc-form',
    templateUrl: './oc-form.component.html',
    styleUrls: ['./oc-form.component.css'],
})
export class OcFormComponent implements OnInit, OnChanges {
    /**
     * JSON with all form data to generate dynamic form
     */
    @Input() formJsonData: AppFormModel;

    /**
     * Show button on form.
     * @default true.
     */
    @Input() showButton: boolean = true;

    /**
     * Set position of the buttons.
     * Can be: "center", "left", "right".
     * @default 'left'.
     */
    @Input() buttonPosition: 'center' | 'left' | 'right' | 'justify' = 'left';

    /**
     * Set custom text to success button.
     * @default 'Submit'.
     */
    @Input() successButtonText: string = 'Submit';

    /**
     * Set position of the field label. Can be: "top", "left", "right".
     * @default 'top'.
     */
    @Input() labelPosition: 'top' | 'left' | 'right' = 'top';

    /**
     * Submitting process.
     * The `true` option will lock for click and start the spinner in the submit button.
     */
    @Input() process: boolean = false;

    /**
     * Already generated Form Group.
     * IMPORTANT! Works only for single page form.
     */
    @Input() generatedForm: FormGroup;

    /**
     * Returning all form fields value to the parent component.
     */
    @Output() readonly formSubmitted: EventEmitter<any> = new EventEmitter();

    /**
     * Sending true when user cancel form submitting.
     */
    @Output() readonly cancelSubmit: EventEmitter<void> = new EventEmitter();

    /**
     * When need to get data of the form without buttons.
     */
    @Output() readonly formDataUpdated: EventEmitter<any> = new EventEmitter();

    /**
     * @Deprecated.
     * Send form valid status.
     * IMPORTANT! Works only for single page form.
     */
    @Output() readonly isFormInvalid: EventEmitter<boolean> = new EventEmitter();

    /**
     * Emits created form.
     */
    @Output() readonly createdForm: EventEmitter<AbstractControl> = new EventEmitter();

    // PROPERTIES AND BINDINGS FOR WIZARD FORM //

    /**
     * The form type, can be rendered as 'wizard' or classic 'single' form.
     * If 'wizard' - each step will be a formGroup.
     */
    @Input() displayType: FormType = 'page';

    /**
     * Custom template for the save button to show.
     */
    @Input() additionalButton: TemplateRef<any>;

    /**
     * Current wizard step.
     */
    @Input() currentStep: number = 1;

    /**
     * Current wizard step.
     */
    @Input() maxStepsToShow: number = 0;

    /**
     * Current form ID. Used for modifying error messages.
     * Look: {@link ErrorMessageFormId}
     */
    @Input() formId: ErrorMessageFormId = null;

    /**
     * Component emits on what step a user is, when he changes the step.
     */
    @Output() readonly currentStepChange = new EventEmitter<number>();

    /**
     * Submitting process. `true` option will lock for
     * click and start the spinner in the submit button.
     * @default true.
     */
    @Input() showSubmitButton: boolean = true;

    /**
     * Flag to show group heading.
     * @default true.
     */
    @Input() showGroupHeading: boolean = true;

    /**
     * Flag to show group description.
     * @default true.
     */
    @Input() showGroupDescription: boolean = true;

    /**
     * Flag to show progressbar.
     * @default true.
     */
    @Input() showProgressBar: boolean = true;

    /**
     * Input for query params.
     * @default ''.
     */
    @Input() queryParams: string = '';

    customForm: FormArray;
    progressBarSteps: FormProgressbarStep[] = [];
    hasFieldGroups: boolean = false;
    resultData: any = {};
    formStatus: string;

    ngOnInit(): void {
        this.checkFormType(this.displayType);
        if (this.queryParams === 'invalid') {
            this.validateFromAppTable();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.formJsonData && changes.formJsonData.previousValue !== changes.formJsonData.currentValue) {
            this.setStep(1);
            this.checkFormType(this.displayType);
        }
        if (changes.generatedForm && changes.generatedForm.previousValue !== changes.generatedForm.currentValue) {
            if (this.hasFieldGroups) {
                this.customForm = new FormArray([this.generatedForm]);
            }
        }
    }

    validateFromAppTable(): void {
        if (this.hasFieldGroups) {
            this.customForm.markAllAsTouched();
            let foundInvalidStep = false;
            let firstInvalidStep = 1;
            for (let i = 0; i < this.customForm.length; i++) {
                this.validateStep(i);
                if (this.customForm.controls[i].invalid && !foundInvalidStep) {
                    firstInvalidStep = i + 1;
                    foundInvalidStep = true;
                }
            }
            this.setStep(firstInvalidStep);
        }
    }

    mapFormFieldsData(fields: any): void {
        this.resultData = {
            ...this.resultData,
            ...fields,
        };
    }

    onSubmitButtonClicked(): void {
        if (this.displayType === 'wizard' && this.hasFieldGroups) {
            this.validateStep(this.currentStep - 1);
            this.customForm.markAllAsTouched();
            if (this.customForm.invalid) {
                for (let i = 0; i < this.customForm.length; i++) {
                    const stepForm = this.customForm.controls[i];
                    if (stepForm.invalid) {
                        this.setStep(i + 1);
                        return;
                    }
                }
            } else {
                this.formSubmitted.emit(this.resultData);
            }
        } else {
            if (this.customForm.valid) {
                this.formSubmitted.emit(this.resultData); // TODO
            }
        }
    }

    navigateStepsByClick(step: number): void {
        const previousStep = this.currentStep;
        const nextStep = step;
        if (previousStep === nextStep) {
            return;
        } else if (previousStep < nextStep) {
            for (let i = previousStep; i < nextStep; i++) {
                this.validateStep(i - 1);
            }
        } else if (previousStep > nextStep) {
            this.validateStep(this.currentStep - 1);
        }
        this.currentStep = step;
        this.currentStepChange.emit(this.currentStep);
    }

    navigateStepsByButtons(direction: 'next' | 'previous'): void {
        if (direction === 'next') {
            this.validateStep(this.currentStep - 1);
            this.currentStep++;
        } else {
            if (!this.currentForm.pristine) {
                this.validateStep(this.currentStep - 1);
            }
            this.currentStep--;
        }
        this.currentStepChange.emit(this.currentStep);
    }

    /**
     * Updates and emits form on change
     */
    onFormDataUpdated(fields: any): void {
        this.mapFormFieldsData(fields);
        this.formDataUpdated.emit(this.resultData);
    }

    get isFirstStep(): boolean {
        return !this.customForm || this.currentStep === 1;
    }

    get isLastStep(): boolean {
        return !this.customForm || this.currentStep === this.customForm.length;
    }

    get stepLabel(): string {
        return `Step ${this.currentStep}. ${this.currentForm.label ? this.currentForm.label.label : ''}`;
    }

    get stepDescription(): string {
        if (this.currentForm.label) {
            return this.currentForm.label.label;
        }
        return 'Please fill the information below';
    }

    get currentForm(): OcFormGroup {
        return this.customForm.controls[this.currentStep - 1] as OcFormGroup;
    }

    private setStep(step: number): void {
        this.currentStep = step;
        this.currentStepChange.emit(step);
    }

    private checkFormType(type: FormType): void {
        if (!this.generatedForm) {
            if (type === 'wizard') {
                this.createStepsFormArray(this.formJsonData);
                this.hasFieldGroups = this.customForm.controls.length > 1;
                if (this.hasFieldGroups) {
                    this.generateProgressbar();
                }
            } else {
                this.hasFieldGroups = false;
            }
        }
    }

    private generateProgressbar(): void {
        this.progressBarSteps = [];
        this.customForm.controls.forEach((step: any, index) => {
            this.progressBarSteps.push({
                title: step.label ? step.label.label : `Step ${index + 1}`,
                state: 'pristine',
            });
        });
    }

    private createStepsFormArray(data: AppFormModel): void {
        const formsArray: FieldStep[] = [];
        const currentFreeFieldsStep: FieldStep = {
            items: [],
        };
        data.fields.forEach((field, index) => {
            if (field.type === 'fieldGroup') {
                if (currentFreeFieldsStep.items.length > 0) {
                    formsArray.push({ ...currentFreeFieldsStep });
                    currentFreeFieldsStep.items = [];
                }
                const step: FieldStep = {
                    label: field,
                    items: data.fields.filter(item => item.attributes?.group === field.id.replace('customData.', '')),
                };
                if (step.items.length) {
                    formsArray.push(step);
                }
            } else {
                if (!field.attributes?.group) {
                    currentFreeFieldsStep.items.push(field);
                    if (index === data.fields.length - 1) {
                        formsArray.push(currentFreeFieldsStep);
                    }
                }
            }
        });
        this.customForm = new FormArray(
            formsArray.map(item => new OcFormGroup(item.label, item.items, OcFormGenerator.getFormByConfig(item.items))),
        );
        this.customForm.controls.forEach(form => {
            this.mapFormFieldsData(form.value);
        });
        this.createdForm.emit(this.customForm);
    }

    private validateStep(index: number): void {
        const currentForm = this.customForm.controls[index] as OcFormGroup;
        this.validateCurrentControl(currentForm);
        this.progressBarSteps[index].state = currentForm.valid ? 'finished' : 'invalid';
    }

    private validateCurrentControl(currentControl: AbstractControl): void {
        if (currentControl instanceof FormGroup) {
            for (const control of Object.keys(currentControl.controls)) {
                const controlName = currentControl.controls[control];
                this.validateCurrentControl(controlName);
            }
        } else if (currentControl instanceof FormArray) {
            currentControl.controls.forEach(value => {
                this.validateCurrentControl(value);
            });
        } else {
            currentControl.updateValueAndValidity();
        }
    }
}
