import {moduleMetadata, storiesOf} from '@storybook/angular';
import {OcAppGetStartedComponent} from 'projects/oc-ng-common-component/src/lib/oc-app-get-started/oc-app-get-started.component';
import {
  OcCommonLibModule
} from 'projects/oc-ng-common-component/src/public-api';
import {linkTo} from '@storybook/addon-links';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Get Started',
  component: OcAppGetStartedComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const GetStartedComponent = (args: OcAppGetStartedComponent) => ({
  component: OcAppGetStartedComponent,
  moduleMetadata: modules,
  props: args
});


export const DefaultHomPage = GetStartedComponent.bind({});

DefaultHomPage.args = {
  getStartedImage: 'https://drive.google.com/u/0/uc?id=1AZ2zszice2XcGojhCLz1A2TideF_cev_&export=download',
  getStartedHeader: 'List Your App in our App Store',
  getStartedDescription: 'Register as an app developer and submit your app easily with our App Store Developer Portal',
  getStartedButtonText: 'Get Started As An App Developer',
  getStartedType: 'home',
  getStarted: linkTo('SellerActivation', 'Empty')
};
