import axios from 'axios';

function createRequest(path) {
    var instance = axios.create({
        baseURL: `${process.env.REACT_APP_API_ROOT}${path}`,
    });

    instance.defaults.headers.common['Content-Type'] = 'application/json';
    instance.interceptors.response.use(
        (response) => ({ success: true, ...response.data }),
        (error) => {
            if (error.response) {
                return { success: false, error: error.response.data };
            } else {
                return {
                    success: false,
                    error: 'Oops! Something went wrong. Please try again later.',
                };
            }
        }
    );

    return instance;
}

export { createRequest };
