import { FormLayout } from '../components';

export default {
    title: 'Layout/Form',
    component: FormLayout,
    args: {
        text: 'Test Form',
        error: '',
    },
};

const Template = (args) => <FormLayout {...args} />;

export const Primary = Template.bind({});
