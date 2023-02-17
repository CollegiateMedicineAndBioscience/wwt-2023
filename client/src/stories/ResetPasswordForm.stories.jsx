import { rest } from 'msw';

import { ResetPasswordForm } from '../controllers';
import { MessageProvider } from '../contexts';

export default {
    title: 'Pages/Reset Password',
    component: ResetPasswordForm,
};

const Template = (args) => (
    <MessageProvider>
        <ResetPasswordForm {...args} />
    </MessageProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {
    msw: {
        handlers: [
            rest.patch(
                `${process.env.REACT_APP_API_ROOT}/user/reset/undefined`,
                (req, res, ctx) => {
                    return res();
                }
            ),
        ],
    },
};
