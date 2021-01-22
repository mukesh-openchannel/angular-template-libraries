import {NgModule} from '@angular/core';
import {OcCommonLibComponent} from './oc-ng-common-component.component';
import {OcButtonComponent} from './oc-button/oc-button.component';
import {OcInputComponent} from './oc-input/oc-input.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {OcLabelComponent} from './oc-label/oc-label.component';
import {OcCheckboxComponent} from './oc-checkbox/oc-checkbox.component';
import {OcRadioComponent} from './oc-radio/oc-radio.component';
import {OcSignupComponent} from './oc-signup/oc-signup.component';
import {OcPasswordComponent} from './oc-password/oc-password.component';
import {OcLoginComponent} from './oc-login/oc-login.component';
import {OcFeaturedAppsComponent} from './oc-featured-apps/oc-featured-apps.component';
import {OcSelectComponent} from './oc-select/oc-select.component';
import {OcBoxGridComponent} from './oc-box-grid/oc-box-grid.component';
import {OcRatingComponent} from './oc-rating/oc-rating.component';
import {OcTextSearchComponent} from './oc-text-search/oc-text-search.component';
import {OcForgotPasswordComponent} from './oc-forgot-password/oc-forgot-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OcErrorComponent} from './oc-error/oc-error.component';
import {EmailValidatorDirective} from './validators/email-validator.directive';
import {WhiteSpaceValidatorDirective} from './validators/white-space-validator';
import {OcAppCategoriesComponent} from './oc-app-categories/oc-app-categories.component';
import {AutofocusDirective} from './validators/autofocus.directive';
import {DomainValidatorDirective} from './validators/domain-validator.directive';
import {DragDropDirective} from './validators/drag-drop.directive';
import {FileSizePipe} from './validators/file-size.pipe';
import {ImageFileValidatorDirective} from './validators/image-file-validator.directive';
import {PasswordToggleDirective} from './directive/password-toggle.directive';
import {PhoneNumberValidatorDirective} from './validators/phone-number-validator.directive';
import {WebsiteValidatorDirective} from './validators/website-validator.directive';
import {OcAppGetStartedComponent} from './oc-app-get-started/oc-app-get-started.component';
import {OcChartComponent} from './oc-chart/oc-chart.component';
import {OcAppGalleryComponent} from './oc-app-gallery/oc-app-gallery.component';
import {OcAppListGridComponent} from './oc-app-list-grid/oc-app-list-grid.component';
import {OcRecommendedAppsComponent} from './oc-recommended-apps/oc-recommended-apps.component';
import {OcOverallRatingComponent} from './oc-overall-rating/oc-overall-rating.component';
import {OcAppCardComponent} from './oc-app-card/oc-app-card.component';
import {OcReviewListComponent} from './oc-review-list/oc-review-list.component';
import {OcSelectExpandableComponent} from './oc-select-expandable/oc-select-expandable.component';
import {OcFileUploadComponent} from './oc-file-upload/oc-file-upload.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {OcAppCategorySelectComponent} from './oc-app-category-select/oc-app-category-select.component';
import {OcPopupComponent} from './oc-popup/oc-popup.component';
import {SafehtmlPipe} from './pipe/safehtml.pipe';
import {RemoveHtmlTagsPipe} from './pipe/remove-html-tags.pipe';
import {CamelcasePipe} from './pipe/camelcase.pipe';
import {EllipsisPipe} from './pipe/ellipsis.pipe';
import {OcActivationComponent} from './oc-activation/oc-activation.component';
import {CompareDirective} from './validators/compare-passsword-validator.directive';
import {OcAppStatusDetailsComponent} from './oc-app-status-details/oc-app-status-details.component';
import {OcTextareaComponent} from './oc-textarea/oc-textarea.component';
import {OcNumberComponent} from './oc-number/oc-number.component';
import {OcSellerAgreementComponent} from './oc-seller-agreement/oc-seller-agreement.component';
import {OcResetPasswordComponent} from './oc-reset-password/oc-reset-password.component';
import {OcRichTextEditorComponent} from './oc-rich-text-editor/oc-rich-text-editor.component';
import {OcTagsComponent} from './oc-tags/oc-tags.component';
import {OcTagElementComponent} from './oc-tag-element/oc-tag-element.component';
import {OcDropboxComponent} from './oc-dropbox/oc-dropbox.component';
import {OcTitleComponent} from './oc-title/oc-title.component';
import {OcFormComponent} from './oc-form/oc-form.component';
import {OnlyNumberDirective} from './directive/only-number.directive';
import {OcVideoUrlComponent} from './oc-video-url/oc-video-url.component';
import {AppIconsModule} from './app-icon-module/app-icons.module';
import {OcColorComponent} from './oc-color/oc-color.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {OcDatetimePickerComponent} from './oc-datetime-picker/oc-datetime-picker.component';
import {OcMultiSelectListComponent} from './oc-multi-select-list/oc-multi-select-list.component';
import {OcDynamicFieldArrayComponent} from './oc-dynamic-field-array/oc-dynamic-field-array.component';
import {OcDynamicArrayItemComponent} from './oc-dynamic-array-item/oc-dynamic-array-item.component';
import {OcFormModalComponent} from './oc-form-modal/oc-form-modal.component';
import {PricePipe} from './pipe/price.pipe';
import {EditorModule} from '@tinymce/tinymce-angular';
import {RouterModule} from '@angular/router';
import {OcDropdownComponent} from './oc-dropdown/oc-dropdown.component';
import {OcVideoComponent} from './oc-video/oc-video.component';
import {OcImageGalleryComponent} from './oc-image-gallery/oc-image-gallery.component';
import { OcAppDescriptionComponent } from './oc-app-description/oc-app-description.component';
import { OcToastsComponent } from './oc-toasts/oc-toasts.component';
import { OcResendActivationComponent } from './oc-resend-activation/oc-resend-activation.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {OcDropdownButtonComponent} from './oc-dropdown-button/oc-dropdown-button.component';
import {EmbedVideo} from 'ngx-embed-video';
import { OcMenuUserGridComponent } from './oc-menu-user-grid/oc-menu-user-grid.component';
import {OcTooltipLabelComponent} from './oc-tooltip-label/oc-tooltip-label.component';
import {PasswordValidatorDirective} from './validators/password-validator.directive';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {OcAppShortInfoComponent} from './oc-app-short-info/oc-app-short-info.component';
import { OcAppTableComponent } from './oc-app-table/oc-app-table.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { OcSidebarComponent } from './oc-sidebar/oc-sidebar.component';

@NgModule({
  declarations: [OcCommonLibComponent,
    OcInputComponent,
    OcButtonComponent,
    OcLabelComponent,
    OcCheckboxComponent,
    OcRadioComponent,
    OcSignupComponent,
    OcPasswordComponent,
    OcLoginComponent,
    EmailValidatorDirective,
    OcFeaturedAppsComponent,
    OcSelectComponent,
    OcBoxGridComponent,
    OcRatingComponent,
    OcTextSearchComponent,
    OcAppCategoriesComponent,
    OcForgotPasswordComponent,
    WhiteSpaceValidatorDirective,
    OcErrorComponent,
    AutofocusDirective,
    DomainValidatorDirective,
    DragDropDirective,
    FileSizePipe,
    ImageFileValidatorDirective,
    PasswordValidatorDirective,
    PasswordToggleDirective,
    PhoneNumberValidatorDirective,
    WebsiteValidatorDirective,
    OcChartComponent,
    OcAppTableComponent,
    OcAppGetStartedComponent,
    OcAppGalleryComponent,
    OcAppListGridComponent,
    OcMenuUserGridComponent,
    OcRecommendedAppsComponent,
    OcOverallRatingComponent,
    OcAppCardComponent,
    OcReviewListComponent,
    OcSelectExpandableComponent,
    OcFileUploadComponent,
    OcAppCategorySelectComponent,
    OcPopupComponent,
    OcDropdownComponent,
    OcDropdownButtonComponent,
    OcVideoComponent,
    OcImageGalleryComponent,
    SafehtmlPipe,
    CamelcasePipe,
    EllipsisPipe,
    RemoveHtmlTagsPipe,
    PricePipe,
    CompareDirective,
    OcAppStatusDetailsComponent,
    OcActivationComponent,
    CompareDirective,
    OcTextareaComponent,
    OcNumberComponent,
    OcSellerAgreementComponent,
    OcResetPasswordComponent,
    OcRichTextEditorComponent,
    OcTagsComponent,
    OcTagElementComponent,
    OcDropboxComponent,
    OcTitleComponent,
    OcRichTextEditorComponent,
    OcFormComponent,
    OnlyNumberDirective,
    OcVideoUrlComponent,
    OcColorComponent,
    OcDatetimePickerComponent,
    OcMultiSelectListComponent,
    OcFormComponent,
    OcDynamicFieldArrayComponent,
    OcDynamicArrayItemComponent,
    OcFormModalComponent,
    OcAppDescriptionComponent,
    OcToastsComponent,
    OcResendActivationComponent,
    OcTooltipLabelComponent,
    OcAppShortInfoComponent,
    OcSidebarComponent,
  ],

  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ImageCropperModule,
    ReactiveFormsModule,
    AppIconsModule,
    ColorPickerModule,
    EditorModule,
    RouterModule,
    InfiniteScrollModule,
    CarouselModule,
    NgxSpinnerModule,
    HttpClientModule,
    EmbedVideo.forRoot(),
    AngularSvgIconModule.forRoot()
  ],
  exports: [OcCommonLibComponent,
    OcInputComponent,
    OcButtonComponent,
    OcLabelComponent,
    OcCheckboxComponent,
    OcRadioComponent,
    OcSignupComponent,
    OcActivationComponent,
    OcPasswordComponent,
    OcLoginComponent,
    EmailValidatorDirective,
    WhiteSpaceValidatorDirective,
    OcFeaturedAppsComponent,
    OcSelectComponent,
    OcBoxGridComponent,
    OcRatingComponent,
    OcTextSearchComponent,
    OcAppCategoriesComponent,
    OcForgotPasswordComponent,
    OcErrorComponent,
    AutofocusDirective,
    DomainValidatorDirective,
    DragDropDirective,
    FileSizePipe,
    CamelcasePipe,
    EllipsisPipe,
    PricePipe,
    ImageFileValidatorDirective,
    PasswordValidatorDirective,
    PasswordToggleDirective,
    PhoneNumberValidatorDirective,
    WebsiteValidatorDirective,
    OcChartComponent,
    OcAppTableComponent,
    OcAppGetStartedComponent,
    OcAppGalleryComponent,
    OcSelectExpandableComponent,
    OcFileUploadComponent,
    OcAppListGridComponent,
    OcAppCategorySelectComponent,
    OcPopupComponent,
    OcOverallRatingComponent,
    OcReviewListComponent,
    OcRecommendedAppsComponent,
    OcDropdownComponent,
    OcDropdownButtonComponent,
    OcVideoComponent,
    OcImageGalleryComponent,
    NgbModule,
    CompareDirective,
    OcAppStatusDetailsComponent,
    OcTextareaComponent,
    OcNumberComponent,
    OcSellerAgreementComponent,
    OcResetPasswordComponent,
    OcRichTextEditorComponent,
    OcDropboxComponent,
    OcTitleComponent,
    OcTagElementComponent,
    OcFormComponent,
    OcTagsComponent,
    OcColorComponent,
    OcVideoUrlComponent,
    OcMultiSelectListComponent,
    OcTagsComponent,
    OcDynamicFieldArrayComponent,
    OcAppDescriptionComponent,
    OcToastsComponent,
    OcResendActivationComponent,
    OcMenuUserGridComponent,
    OcAppShortInfoComponent
  ],
  providers: [
    NgbActiveModal,
  ],
  entryComponents: [
    OcSellerAgreementComponent,
    OcFormModalComponent
  ]

})
export class OcCommonLibModule {
}
