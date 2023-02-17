import { rest } from 'msw';

import { RequestPasswordResetForm } from '../controllers';
import { MessageProvider } from '../contexts';
export default {
    title: 'Pages/Request Password Reset',
    component: RequestPasswordResetForm,
};

const Template = (args) => (
    <MessageProvider>
        <RequestPasswordResetForm {...args} />
    </MessageProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {
    msw: {
        handlers: [
            rest.post(`${process.env.REACT_APP_API_ROOT}/user/reset`, (req, res, ctx) => {
                return res();
            }),
        ],
    },
};
