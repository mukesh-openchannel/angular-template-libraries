import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcFormModalComponent } from './oc-form-modal.component';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MockFormComponent, MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';

describe('OcFormModalComponent', () => {
    let component: OcFormModalComponent;
    let fixture: ComponentFixture<OcFormModalComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcFormModalComponent, MockFormComponent, MockSvgIconComponent],
                providers: [NgbActiveModal],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcFormModalComponent);
        component = fixture.componentInstance;

        component.formJsonData = {
            formId: 'test',
            name: 'test',
            createdDate: 1599982592157,
            fields: [
                {
                    id: 'name',
                    label: 'name',
                    description: 'test',
                    defaultValue: null,
                    type: 'text',
                    required: null,
                    attributes: {
                        maxChars: 20,
                        required: true,
                        minChars: 10,
                    },
                    options: null,
                },
                {
                    id: 'role',
                    label: 'role',
                    description: '',
                    defaultValue: 'user',
                    type: 'dropdownList',
                    required: null,
                    attributes: { required: true },
                    options: ['admin', 'user', 'test'],
                },
                {
                    id: 'aboutme',
                    label: 'aboutme',
                    description: '',
                    defaultValue: null,
                    type: 'richText',
                    required: null,
                    attributes: {
                        maxChars: 150,
                        required: null,
                        minChars: 10,
                    },
                    options: null,
                },
                {
                    id: 'skills',
                    label: 'skills',
                    description: 'skills',
                    defaultValue: ['angular'],
                    type: 'tags',
                    required: null,
                    attributes: {
                        minCount: 1,
                        maxCount: 5,
                        required: true,
                    },
                    options: null,
                },
            ],
        };
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should show form', () => {
        fixture.detectChanges();

        const formComponent = fixture.debugElement.query(By.css('oc-form'));
        expect(formComponent).toBeTruthy();
    });

    it('should catch form data', () => {
        fixture.detectChanges();

        const formComponent: MockFormComponent = fixture.debugElement.query(By.css('oc-form')).componentInstance;

        formComponent.submitForm();

        expect(component.formJsonData).toBeTruthy();
    });

    it('should close the modal', () => {
        jest.spyOn(component, 'dismiss');
        fixture.detectChanges();

        const closeBtn = fixture.debugElement.query(By.css('.form-modal__header-close-icon')).nativeElement;

        closeBtn.click();

        expect(component.dismiss).toHaveBeenCalled();
    });
});
