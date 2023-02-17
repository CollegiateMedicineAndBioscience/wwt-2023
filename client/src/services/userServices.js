import Cookies from 'js-cookie';
import { Buffer } from 'buffer';

import { createRequest } from './requests';

async function login({ email, password, remember }) {
    const encoded = Buffer.from(`${email}:${password}`).toString('base64');

    const instance = createRequest('/user');
    instance.defaults.headers.common['Authorization'] = `basic ${encoded}`;

    const response = await instance.post('/login', { remember });

    if (!response.success) {
        return response;
    }

    Cookies.set('token', response.token, { expires: 1 });

    return response;
}

async function register(data) {
    const instance = createRequest('/user');

    return instance.post('/', data);
}

async function logout() {
    const instance = createRequest('/user');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    await instance.post('/logout');
}

async function updateUserDetails(data) {
    const instance = createRequest('/user');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    return instance.patch(`/`, data);
}

async function requestPasswordReset(data) {
    const instance = createRequest('/user');

    return instance.post(`/reset`, data);
}

async function resetPassword(id, data) {
    const instance = createRequest('/user');

    return instance.patch(`/reset/${id}`, data);
}

async function getUser(id) {
    const instance = createRequest('/user');

    if (!id) {
        const body = Cookies.get('token').split('.')[1];

        const decodedBody = JSON.parse(new Buffer.from(body, 'base64'));

        return instance.get(`/`, { params: { id: decodedBody.uid } });
    }

    return instance.get(`/`, { params: { id } });
}

export { login, logout, register, updateUserDetails, requestPasswordReset, resetPassword, getUser };
