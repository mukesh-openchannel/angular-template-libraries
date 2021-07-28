import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentsUserActivationModel } from '../models/auth-types.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'oc-activation',
    templateUrl: './oc-activation.component.html',
    styleUrls: ['./oc-activation.component.css'],
})
export class OcActivationComponent {
    /**
     * RouterLink which will lead to the Resend activation code page.
     * Example:
     *
     * `["/resend"] | "resend"`
     */
    @Input() resendActivationUrl: any[] | string | null | undefined;
    /**
     * RouterLink which will lead to the Sign Up page.
     * Example:
     *
     * `["/signup"] | "signup"`
     */
    @Input() signupUrl: any[] | string | null | undefined;
    /**
     * Link of the logo image.
     * Example:
     *
     * `"https://image.jpg " | "./assets/img/img.jpg"`
     */
    @Input() companyLogoUrl: string = '';
    /**
     * When true - sets spinner on button and blocking any button action.
     * Example:
     *
     * `"https://image.jpg " | "./assets/img/img.jpg"`
     */
    @Input() process: boolean = false;
    /**
     * Required input.
     * User activation model. Must contain field "code".
     * This Field will be used as ngModel.
     * @example
     * {
     *     password: '',
     *     email: '',
     *     code: ''
     * }
     */
    @Input() activationModel = new ComponentsUserActivationModel();
    /**
     * Emitting that Activate button was pressed
     */
    @Output() submit = new EventEmitter<any>();

    submitForm(form: NgForm): void {
        if (!this.process) {
            if (!form.valid) {
                form.control.markAllAsTouched();
            }
            this.submit.emit(form.valid);
        }
    }
}
