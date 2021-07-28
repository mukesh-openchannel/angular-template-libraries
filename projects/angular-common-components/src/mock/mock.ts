import { Component, EventEmitter, forwardRef, Input, Output, TemplateRef } from '@angular/core';
import {
    AbstractControl,
    AbstractControlDirective,
    ControlValueAccessor,
    FormArray,
    NG_VALUE_ACCESSOR,
    NgModel,
    FormControl,
    FormGroup,
} from '@angular/forms';
import {
    AppTypeFieldModel,
    DropdownModel,
    FullAppData,
    RadioItemValue,
} from '@openchannel/angular-common-components/src/lib/common-components';
import { OcCheckboxData, OcEditUserFormConfig, OCOrganization } from '@openchannel/angular-common-components/src/lib/auth-components';
import { FieldValueModel, DropdownItemType } from '@openchannel/angular-common-components/src/lib/form-components';
import { Observable } from 'rxjs';

@Component({
    selector: 'oc-label',
    template: '',
})
export class MockLabelComponent {
    /** Label text */
    @Input() text: string = '';
    /** Show indicator of required field */
    @Input() required: boolean = false;
    /** Set global classes for label */
    @Input() class: string = '';
}

@Component({
    selector: 'oc-input',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MockInputComponent),
            multi: true,
        },
    ],
})
export class MockInputComponent implements ControlValueAccessor {
    @Input() inputType: string = 'text';
    @Input() placeholder: string = '';

    registerOnChange(fn: any): void {}

    registerOnTouched(fn: any): void {}

    writeValue(obj: any): void {}
}

@Component({
    selector: 'oc-error',
    template: '',
})
export class MockErrorComponent {
    @Input() control: AbstractControlDirective | AbstractControl | NgModel;
    @Input() field: string;
    @Input() modifyErrors: string;
}

@Component({
    selector: 'oc-button',
    template: '',
})
export class MockButtonComponent {
    @Input() text: string = '';
    @Input() disabled: boolean = false;
    @Input() type: 'primary' | 'secondary' | 'link' = 'primary';
    @Input() customClass: string;
    @Input() style: string;
    @Input() process: boolean;
    @Input() customTemplate: TemplateRef<any>;
}

@Component({
    template: '',
})
export class MockRoutingComponent {}

@Component({
    selector: 'svg-icon',
    template: '',
})
export class MockSvgIconComponent {
    @Input() src: string;
}

@Component({
    selector: 'oc-password',
    template: '',
})
export class MockPasswordComponent {
    @Input() placeholder;
    /** Set `disable` state for input */
    @Input() disabled: boolean = false;
    /**
     *  Type of the input. Can be `text` or `email`
     *  @default 'text'
     */
    @Input() inputType: string = 'text';
}

@Component({
    selector: 'oc-checkbox',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MockCheckboxComponent),
            multi: true,
        },
    ],
})
export class MockCheckboxComponent implements ControlValueAccessor {
    @Input() labelText: string;
    @Input() requiredIndicator: boolean = false;
    @Input() formControl: FormControl;
    @Input() value: boolean;
    @Input() disabled: boolean;
    @Output() readonly isCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}
    writeValue(obj: any): void {}
}

@Component({
    template: '',
    selector: 'oc-form',
})
export class MockFormComponent {
    @Input() formJsonData: any;
    @Input() generatedForm: FormGroup;
    @Input() successButtonText: string = 'Submit';
    @Input() showButton: boolean = true;
    @Output() readonly formSubmitted = new EventEmitter<any>();
    @Output() readonly cancelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

    formData = {
        name: 'Test name',
        role: 'admin',
        aboutme: '',
        skills: ['angular'],
    };

    submitForm(): any {
        this.formSubmitted.emit(this.formData);
    }
}

@Component({
    selector: 'oc-rating',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MockRatingComponent),
            multi: true,
        },
    ],
})
export class MockRatingComponent implements ControlValueAccessor {
    @Input() rating: number = 0;
    @Input() reviewCount: number = 0;
    @Input() label = '';
    @Input() labelClass = 'font-m font-med';
    @Input() type: 'single-star' | 'multi-star' = 'single-star';
    @Input() disabled: boolean = false;
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}
    writeValue(obj: any): void {}
}

@Component({
    selector: 'oc-app-card',
    template: '',
})
export class MockAppCardComponent {
    @Input() app: FullAppData;
    @Input() appRouterLink: any | string;
}

@Component({
    selector: 'oc-title',
    template: '',
})
export class MockTitleComponent {
    @Input() title: string;
    @Input() customStyle: any;
}

@Component({
    selector: 'oc-dynamic-field-array',
    template: '',
})
export class MockDynamicFieldArrayComponent {
    @Input() dfaFormArray: FormArray;
    @Input() fieldDefinitionData: AppTypeFieldModel;
}

@Component({
    selector: 'oc-select',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MockSelectComponent),
            multi: true,
        },
    ],
})
export class MockSelectComponent implements ControlValueAccessor {
    @Input() selectValArr: any | object[] = [];
    @Input() form: FormControl;
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}
    writeValue(obj: any): void {}
}

@Component({
    selector: 'oc-edit-user-form',
    template: '',
})
export class MockEditUserFormComponent {
    @Input() formConfigs: OcEditUserFormConfig[];
    @Input() defaultTypeLabelText: string;
    @Input() enableTypesDropdown = false;
    @Input() enablePasswordField = false;
    @Input() enableTermsCheckbox: OcCheckboxData;
    @Input() defaultAccountData: OCOrganization;
    @Input() defaultOrganizationData: OCOrganization;
    @Input() customTermsDescription: TemplateRef<any>;
}

@Component({
    selector: 'oc-tag-element',
    template: '',
})
export class MockTagComponent {
    @Input() title: string;
    @Input() closeMarker: boolean = false;
    @Input() deleteTagImgUrl: string = '~@openchannel/angular-common-components/assets/img/close-icon.svg';
    @Output() readonly clickEmitter = new EventEmitter<string>();
}

@Component({
    selector: 'oc-dynamic-array-preview',
    template: '',
})
export class MockDynamicArrayPreview {
    @Input() fieldValues: FieldValueModel[];
    @Input() fieldDefinition: AppTypeFieldModel;
    @Input() dfaForm: FormGroup;
    @Input() hideLabel: boolean;
}

@Component({
    selector: 'oc-multi-select-checkbox-list',
    template: '',
})
export class MockMultiSelectCheckboxList {
    @Input() itemsArray: DropdownItemType[];
    @Input() defaultItemsArray: DropdownItemType[];
    @Output() readonly selectedItemsOutput = new EventEmitter<DropdownItemType[]>();
}

@Component({
    selector: 'oc-radio-button-list',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MockRadioButtonListComponent),
            multi: true,
        },
    ],
})
export class MockRadioButtonListComponent implements ControlValueAccessor {
    @Input() value: RadioItemValue;
    @Input() customRadioItemRef: TemplateRef<DropdownModel<RadioItemValue>> = null;
    @Input() disabled: boolean = false;
    @Input() itemsArray: DropdownModel<RadioItemValue>[] = [];
    @Input() radioButtonGroup: string = '';
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}
    writeValue(obj: any): void {}
}

@Component({
    selector: 'oc-radio-button',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MockRadioButtonComponent),
            multi: true,
        },
    ],
})
export class MockRadioButtonComponent implements ControlValueAccessor {
    @Input() value: any;
    @Input() disabled: boolean = false;
    @Input() labelText: string;
    @Input() requiredIndicator: boolean = false;
    @Input() radioButtonGroupName: string = '';
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}
    writeValue(obj: any): void {}
}


@Component({
    template: '',
    selector: 'oc-dropbox',
})
export class MockDropboxComponent {
    @Input() placeHolder: string;
    @Input() items: string [];
    @Input() customSearch: (text: Observable<string>) => Observable<readonly any[]>;
    @Input() clearFormAfterSelect: boolean = false;
    @Input() dropElementTemplate: TemplateRef<any>;
}


@Component({
    template: '',
    selector: 'oc-initials',
})
export class MockInitialsComponent {
    @Input() initialsImageURL: string;
    @Input() initialsName: string;
    @Input() primaryInitialType: 'name' | 'image' = 'name';
    @Input() initialsNameCharactersLimit: number = 2;
}

@Component({
    template: '',
    selector: 'oc-dropdown-multi-app',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MockDropdownMultiApp),
            multi: true,
        },
    ],
})
export class MockDropdownMultiApp implements ControlValueAccessor {
    @Input() dropdownPlaceholder: string = '';
    @Input() dropdownClearTextAfterSelect: boolean = true;

    @Input() dropdownCustomDropdownItemTemplateRef: TemplateRef<any>;
    @Input() dropdownCustomTagTemplateRef: TemplateRef<any>;

    @Input() defaultAppIDs: string[] = [];

    @Input() itemPreviewName: string = 'App Name :';
    @Input() itemPreviewId: string = 'Id :';
    @Input() itemPreviewVersion: string = 'Version :';
    @Input() value: string[] | any;
    @Output() readonly selectedAppsOutput: EventEmitter<FullAppData[]> = new EventEmitter<FullAppData[]>();
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}
    writeValue(obj: any): void {}
}
