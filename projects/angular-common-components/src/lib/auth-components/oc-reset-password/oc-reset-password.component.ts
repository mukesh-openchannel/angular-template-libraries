import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentsUserResetPassword } from '../models/auth-types.model';

/**
 * A reset password component. A form, which allows user to change his account password.
 * Contains of a header, password field and navigation links.
 */
@Component({
    selector: 'oc-reset-password',
    templateUrl: './oc-reset-password.component.html',
    styleUrls: ['./oc-reset-password.component.css'],
})
export class OcResetPasswordComponent {
    /**
     * A source path for company logo.
     * @type {string}.
     */
    @Input() companyLogoUrl: string;

    /**
     * A variable which determines whether to show or hide button text.
     * Shows button text if it has no active process.
     * @type {boolean}.
     */
    @Input() process: boolean;

    /**
     * Login url for those users who already has an account.
     * @type {string}.
     */
    @Input() loginUrl: string;

    /**
     * Signup url for those users who has no account yet.
     * @type {string}.
     */
    @Input() signupUrl: string;

    /**
     * The user password model for signup.
     * @type {ComponentsUserResetPassword}.
     */
    @Input() resetModel: ComponentsUserResetPassword = new ComponentsUserResetPassword();

    /**
     * Event emitter that submits form.
     * Uses ResetPasswordForm.
     * @type {*}.
     */
    @Output() readonly submit: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Submits a reset password form.
     * Marks all fields as touched.
     * Then emits the valid value of the form.
     */
    submitForm(form: any): void {
        if (!form.valid || this.process) {
            form.control.markAllAsTouched();
            this.submit.emit(false);
        } else {
            this.submit.emit(true);
        }
    }

    /**
     * Calls when form model changes.
     * Checks form errors and validators.
     */
    onchange(form: any): void {
        if (form.form.controls.newPassword.errors && form.form.controls.newPassword.errors.serverErrorValidator) {
            form.form.controls.newPassword.setErrors(null);
        }
    }
}
