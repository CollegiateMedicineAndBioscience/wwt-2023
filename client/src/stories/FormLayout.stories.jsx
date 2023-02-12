import { FormLayout } from '../components';

export default {
    title: 'Layout/Form',
    component: FormLayout,
    args: {
        text: 'Test Form',
        variant: 'h4',
        error: '',
    },
};

const Template = (args) => (
    <FormLayout
        text={{ variant: args.variant, text: args.text }}
        error={args.error}
        sx={{ color: 'text.main' }}
    />
);

export const Primary = Template.bind({});
