import fetch from "unfetch";

export const getAllStudents = () => fetch('api/students')
    .then(response => {
        if (response.ok) {
            return response;
        }
        // convert non-2xx HTTP responses into errors:
        const error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
    })
    .then(response => response.json());