export class ComponentsUserActivationModel {
    password: string;
    email: string;
    code: string;
}

export class ComponentsUserResetPassword {
    newPassword: string;
    code: string;
}

export class ComponentsUserLoginModel {
    email: string;
    password: string;
    isChecked: boolean;
}

export class ComponentsUserRegistrationModel {
    uname: string;
    company: string;
    password: string;
    email: string;
    isChecked: boolean;
}
