import { createRequest } from './requests';

function getAllOrgs() {
    const instance = createRequest('/org');

    return instance.get('/');
}

export { getAllOrgs };
