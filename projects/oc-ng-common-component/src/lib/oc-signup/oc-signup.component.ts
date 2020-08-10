import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SellerSignup } from 'oc-ng-common-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'oc-signup',
  templateUrl: './oc-signup.component.html',
  styleUrls: ['./oc-signup.component.scss']
})
export class OcSignupComponent implements OnInit {
  imagePath: any;

  @Input() signupModel = new SellerSignup();
  @Input() loginUrl;
  @Input() activationUrl;
  @Input() signupUrl;
  @Input() termsUrl;
  @Input() policyUrl;
  @Input() companyLogoUrl;
  @Input() process;
  @Input() forgotPasswordDoneUrl;
  @Input() showSignupFeedbackPage;
 
  @Output() submit = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  getValue(label: string) {
    return label;
  }

  // getImage() {
  //   return "~oc-ng-common-component/assets/img/logo-philips.svg";
  // }

  // img = {
  //   src: url('~oc-ng-common-component/assets/img/logo-philips.svg');
  // }

  submitForm(form) {
    if (!form.valid) {
      form.control.markAllAsTouched();
      this.submit.emit(false);
      return false;
    }
    this.submit.emit(true);  
    return false;    
  }

  goToActivationPage(){
    this.router.navigateByUrl(this.activationUrl);
  }
}
