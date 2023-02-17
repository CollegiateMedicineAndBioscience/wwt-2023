import { rest } from 'msw';

import { RegisterForm } from '../controllers';
import { MessageProvider } from '../contexts';

export default {
    title: 'Pages/Register',
    component: RegisterForm,
};

const Template = (args) => (
    <MessageProvider>
        <RegisterForm {...args} />
    </MessageProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {
    msw: {
        handlers: [
            rest.get(`${process.env.REACT_APP_API_ROOT}/org`, (req, res, ctx) => {
                return res(
                    ctx.json({
                        organizations: [
                            {
                                id: 'fea6cc39-d83c-4261-af4d-7b7174414b91',
                                name: 'Collegiate School of Medicine and Bioscience',
                            },
                            {
                                id: 'aac065b3-3535-483e-85e1-55f6848a30be',
                                name: 'Metro Academic and Classical High School',
                            },
                            {
                                id: '53241811-b992-4c76-9078-d86f35d5326d',
                                name: 'Central Visual and Performing Arts High School',
                            },
                        ],
                    })
                );
            }),
            rest.post(`${process.env.REACT_APP_API_ROOT}/user`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        ],
    },
};