import { createRequest } from './requests';

function searchItems(form) {
    const instance = createRequest('/items');

    return instance.get('/', { params: form });
}

export { searchItems };
