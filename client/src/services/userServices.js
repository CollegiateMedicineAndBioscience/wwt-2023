import Cookies from 'js-cookie';
import { Buffer } from 'buffer';

import { createRequest } from './requests';

async function login({ email, password, remember }) {
    const encoded = Buffer.from(`${email}:${password}`).toString('base64');

    const instance = createRequest('/user');
    instance.defaults.headers.common['Authorization'] = `basic ${encoded}`;

    const { data } = await instance.post('/login', { remember });

    Cookies.set('token', data.token, { expires: 1 });

    return data;
}

async function register(data) {
    const instance = createRequest('/user');

    await instance.post('/', data);
}

async function logout() {
    const instance = createRequest('/user');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    await instance.post('/logout');
}

async function updateUserDetails(data) {
    const instance = createRequest('/user');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    await instance.patch(`/`, data);
}

export { login, logout, register, updateUserDetails };
