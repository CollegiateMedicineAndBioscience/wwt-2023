import axios from 'axios';

function createRequest(path, auth) {
    var request = axios.create({
        baseURL: `${process.env.REACT_APP_API_ROOT}${path}`,
    });

    request.defaults.headers.common['Content-Type'] = 'application/json';

    if (auth) {
        request.defaults.headers.common['Authorization'] = auth;
    }

    return request;
}

export { createRequest };
