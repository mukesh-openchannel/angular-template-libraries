import { OcCommonLibModule } from '../projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import { moduleMetadata } from '@storybook/angular';
import { OcFormComponent } from '../projects/oc-ng-common-component/src/lib/oc-form/oc-form.component';

const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Form Group Component',
  component: OcFormComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const FormGroupComponent = (args: OcFormComponent) => ({
  component: OcFormComponent,
  moduleMetadata: modules,
  props: args
});

export const FormWithTestData = FormGroupComponent.bind({});

FormWithTestData.args = {
  formJsonData: {
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
        minChars: 10
      },
      options: null,
      subFieldDefinitions: null
    },
    {
      id: 'role',
      label: 'role',
      description: '',
      defaultValue: null,
      type: 'dropdownList',
      required: null,
      attributes: {required: true},
      options: ['admin', 'user', 'test'],
      subFieldDefinitions: null
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
        minChars: 10
      },
      options: null,
      subFieldDefinitions: null
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
        required: true
      }, options: null,
      subFieldDefinitions: null
    }]
  }
};

export const FormWithRequiredOnly = FormGroupComponent.bind({});

FormWithRequiredOnly.args = {
  formJsonData: {
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
          maxChars: null,
          required: true,
          minChars: null
        },
        options: null,
        subFieldDefinitions: null
      },
      {
        id: 'role',
        label: 'role',
        description: '',
        defaultValue: null,
        type: 'dropdownList',
        required: null,
        attributes: {required: true},
        options: ['admin', 'user', 'test'],
        subFieldDefinitions: null
      },
      {
        id: 'aboutme',
        label: 'aboutme',
        description: '',
        defaultValue: null,
        type: 'richText',
        required: null,
        attributes: {
          maxChars: null,
          required: null,
          minChars: null
        },
        options: null,
        subFieldDefinitions: null
      },
      {
        id: 'skills',
        label: 'skills',
        description: 'skills',
        defaultValue: ['angular'],
        type: 'tags',
        required: null,
        attributes: {
          minCount: null,
          maxCount: null,
          required: true
        }, options: null,
        subFieldDefinitions: null
      }]
  }
};

export const FormWithNumberInput =  FormGroupComponent.bind({});

FormWithNumberInput.args = {
  formJsonData: {
    formId: 'test',
    name: 'test',
    createdDate: 1599982592157,
    fields: [
      {
        attributes:	{
          max:	25,
          min:	5,
          required:	null,
        },
        category:	'CUSTOM',
        defaultValue:	null,
        description:	'',
        id:	'test-number',
        isOpen:	false,
        isValid:	true,
        label:	'Test number',
        placeholder:	null,
        type:	'number',
      }
    ]
  }
};
