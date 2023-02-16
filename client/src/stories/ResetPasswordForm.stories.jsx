import { rest } from 'msw';

import { ResetPasswordForm } from '../controllers';
import { ErrorProvider } from '../contexts';

export default {
    title: 'Pages/Reset Password',
    component: ResetPasswordForm,
};

const Template = (args) => (
    <ErrorProvider>
        <ResetPasswordForm {...args} />
    </ErrorProvider>
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
