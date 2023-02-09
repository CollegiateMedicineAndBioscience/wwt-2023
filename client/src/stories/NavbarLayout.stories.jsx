import { rest } from 'msw';

import { UserContext } from '../contexts';
import { NavbarLayout } from '../controllers';

export default {
    title: 'Layout/Navbar',
    component: NavbarLayout,
    parameters: {
        msw: {
            handlers: [
                rest.post(`${process.env.REACT_APP_API_ROOT}/user/logout`, (req, res, ctx) => {
                    return res(ctx.json({}));
                }),
            ],
        },
    },
};

const Template = (args) => (
    <UserContext.Provider
        value={{
            ...args,
            setLoggedIn: () => {},
        }}
    >
        <NavbarLayout />
    </UserContext.Provider>
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    loggedIn: true,
};

export const LoggedOut = Template.bind({});
