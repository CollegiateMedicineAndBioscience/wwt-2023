import { rest } from 'msw';

import { LoginForm } from '../controllers';
import { ErrorProvider } from '../contexts';

export default {
    title: 'Forms/Login',
    component: LoginForm,
};

const Template = (args) => (
    <ErrorProvider>
        <LoginForm {...args} />
    </ErrorProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {
    msw: {
        handlers: [
            rest.post(`${process.env.REACT_APP_API_ROOT}/auth/login`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        ],
    },
};
