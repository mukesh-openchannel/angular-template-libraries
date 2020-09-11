import {moduleMetadata} from '@storybook/angular';
import {OcCommonLibModule} from 'projects/oc-ng-common-component/src/public-api';
import {OcTagsComponent} from "../projects/oc-ng-common-component/src/lib/oc-tags/oc-tags.component";

const modules = {
    imports: [OcCommonLibModule]
};

export default {
    title: 'Tags',
    component: OcTagsComponent,
    decorators: [
        moduleMetadata(modules),
    ],
    argTypes: { updatingTags: { action: 'Get Tags' }}
};

const TagsComponent = (args: OcTagsComponent) => ({
    component: OcTagsComponent,
    moduleMetadata: modules,
    props: args
});

export const DefaultTags = TagsComponent.bind({});

DefaultTags.args = {
    title: 'MyTag',
    required: true,
    description: 'Tag description description description description description',
    placeHolderInputName: 'Input text',
    placeHolderDropBoxName: 'Select text',
    availableTags: ['default', 'first', 'second',
        '111111', '222222', '333333', '444444444444', '5555555555555555', '6666666',
        '777777', '888888', '999999999999', '000000000000'],
    defaultTags: ['default'],
    minTagsCount: 2,
    maxTagsCount: 4,
    ignoreCase: true,
    minTagLength: 3,
    maxTagLength: 30,
};

export const CustomTags = TagsComponent.bind({});
CustomTags.args = {};

CustomTags.args = {
    title: 'MyTag',
    required: true,
    description: 'Tag description description description description description',
    placeHolderInputName: null,
    placeHolderDropBoxName: 'Select MyTag',
    availableTags: ['1', '2', '3', '4', '5', '6', '7', 'default', 'default_second'],
    defaultTags: ['default', 'default_second'],
    minCountTags: 2,
    maxCountTags: 3,
    ignoreCase: true,
    minTagLength: 3,
    maxTagLength: 30,
};




