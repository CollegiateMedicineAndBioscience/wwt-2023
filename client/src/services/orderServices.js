import { createRequest } from './requests';

async function createOrder(data) {
    const instance = createRequest('/order');

    return instance.post(`/`, data);
}

export { createOrder };
