import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcSelectComponent } from './oc-select.component';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { NgbDropdownItem, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MockButtonComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { TransformTextPipe } from '@openchannel/angular-common-components/src/lib/common-components';

describe('OcSelectComponent', () => {
    let component: OcSelectComponent;
    let fixture: ComponentFixture<OcSelectComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcSelectComponent, MockButtonComponent, TransformTextPipe],
                providers: [NgModel],
                imports: [NgbModule, CommonModule, BrowserModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        component.selectValArr = ['item1', 'item2'];
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain selected value', () => {
        component.writeValue('item1');
        expect(component.selectedValue).toEqual('item1');
    });

    it('should set selected value', () => {
        component.value = 'item1';
        expect(component.selectedValue).toEqual('item1');
    });

    it('should contain value in select', async () => {
        component.writeValue('item1');

        const select = fixture.debugElement.query(By.css('.select-component__dropdown')).nativeElement;
        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            expect(select.textContent).toContain('item1');
        });
    });

    it('input should be disabled', async () => {
        component.setDisabledState(true);

        fixture.detectChanges();

        const button: MockButtonComponent = fixture.debugElement.query(By.css('oc-button')).componentInstance;

        await fixture.whenStable().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    it('should call onChange with value', async () => {
        const onChangeFunc = jest.fn();
        component.registerOnChange(onChangeFunc);

        fixture.detectChanges();

        const button: HTMLSelectElement = fixture.debugElement.query(By.directive(NgbDropdownItem)).nativeElement;

        button.dispatchEvent(new Event('click'));

        expect(onChangeFunc).toHaveBeenCalled();
        expect(onChangeFunc.mock.calls[0][0]).toBe('item1');
    });

    it('should call onTouch', async () => {
        const onTouchedFunc = jest.fn();
        component.registerOnTouched(onTouchedFunc);

        fixture.detectChanges();

        const button: HTMLSelectElement = fixture.debugElement.query(By.css('.select-component__action')).nativeElement;

        button.dispatchEvent(new Event('blur'));

        expect(onTouchedFunc).toHaveBeenCalled();
    });
});
