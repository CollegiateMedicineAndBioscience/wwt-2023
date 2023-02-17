import { rest } from 'msw';

import { SearchPage } from '../controllers';
import { MessageProvider, UserContext } from '../contexts';

export default {
    title: 'Pages/Search',
    component: SearchPage,
};

const Template = (args) => (
    <MessageProvider>
        <UserContext.Provider
            value={{
                ...args,
                setLoggedIn: () => {},
            }}
        >
            <SearchPage {...args} />
        </UserContext.Provider>
    </MessageProvider>
);

export const Primary = Template.bind({});
Primary.args = {
    loggedIn: true,
};
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
            rest.get(`${process.env.REACT_APP_API_ROOT}/items`, (req, res, ctx) => {
                return res(
                    ctx.json({
                        items: [
                            {
                                name: 'Triple Beam Balance',
                                owner: {
                                    name: 'May Rodgers',
                                    organization: {
                                        name: 'Central Visual and Performing Arts High School',
                                        address: '3125 S Kingshighway Blvd, St. Louis, MO 63139',
                                    },
                                },
                                ids: [
                                    'a8d26c73-2bad-4cfa-a68c-763e5eee74c4',
                                    '5b898594-4ab8-41c6-924a-c9abf6c775e0',
                                    '1a5be34d-f064-472b-b7de-8c10f726287a',
                                    'f9c1b3a2-4647-4f64-b13f-e0f740f509ac',
                                    '7251e106-b0bd-485e-8f10-836d2df592ea',
                                    'a8d26c73-2bad-4cfa-a68c-763e5eee74c4',
                                    '5b898594-4ab8-41c6-924a-c9abf6c775e0',
                                    '1a5be34d-f064-472b-b7de-8c10f726287a',
                                    'f9c1b3a2-4647-4f64-b13f-e0f740f509ac',
                                    '7251e106-b0bd-485e-8f10-836d2df592ea',
                                    'a8d26c73-2bad-4cfa-a68c-763e5eee74c4',
                                    '5b898594-4ab8-41c6-924a-c9abf6c775e0',
                                    '1a5be34d-f064-472b-b7de-8c10f726287a',
                                    'f9c1b3a2-4647-4f64-b13f-e0f740f509ac',
                                    '7251e106-b0bd-485e-8f10-836d2df592ea',
                                    'a8d26c73-2bad-4cfa-a68c-763e5eee74c4',
                                    '5b898594-4ab8-41c6-924a-c9abf6c775e0',
                                    '1a5be34d-f064-472b-b7de-8c10f726287a',
                                    'f9c1b3a2-4647-4f64-b13f-e0f740f509ac',
                                    '7251e106-b0bd-485e-8f10-836d2df592ea',
                                    'a8d26c73-2bad-4cfa-a68c-763e5eee74c4',
                                    '5b898594-4ab8-41c6-924a-c9abf6c775e0',
                                    '1a5be34d-f064-472b-b7de-8c10f726287a',
                                    'f9c1b3a2-4647-4f64-b13f-e0f740f509ac',
                                    '7251e106-b0bd-485e-8f10-836d2df592ea',
                                    'a8d26c73-2bad-4cfa-a68c-763e5eee74c4',
                                    '5b898594-4ab8-41c6-924a-c9abf6c775e0',
                                    '1a5be34d-f064-472b-b7de-8c10f726287a',
                                    'f9c1b3a2-4647-4f64-b13f-e0f740f509ac',
                                    '7251e106-b0bd-485e-8f10-836d2df592ea',
                                    'a8d26c73-2bad-4cfa-a68c-763e5eee74c4',
                                    '5b898594-4ab8-41c6-924a-c9abf6c775e0',
                                    '1a5be34d-f064-472b-b7de-8c10f726287a',
                                    'f9c1b3a2-4647-4f64-b13f-e0f740f509ac',
                                    '7251e106-b0bd-485e-8f10-836d2df592ea',
                                    'a8d26c73-2bad-4cfa-a68c-763e5eee74c4',
                                    '5b898594-4ab8-41c6-924a-c9abf6c775e0',
                                    '1a5be34d-f064-472b-b7de-8c10f726287a',
                                    'f9c1b3a2-4647-4f64-b13f-e0f740f509ac',
                                    '7251e106-b0bd-485e-8f10-836d2df592ea',
                                    '1a5be34d-f064-472b-b7de-8c10f726287a',
                                    'f9c1b3a2-4647-4f64-b13f-e0f740f509ac',
                                    '7251e106-b0bd-485e-8f10-836d2df592ea',
                                ],
                            },
                        ],
                    })
                );
            }),
            rest.post(`${process.env.REACT_APP_API_ROOT}/order`, (req, res, ctx) => {
                return res();
            }),
        ],
    },
};
