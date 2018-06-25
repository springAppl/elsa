import {message} from 'antd';
function checkHttpCode(data) {
    if (data.httpCode) {
        var error = new Error(data.message)
        throw error
    } else {
        return data;
    }
}

function parseJSON(response) {
    return response.json();
}

let get = (url, resolve) => {
    return fetch(url, {
        credentials: 'same-origin'
    })
    .then(parseJSON)
    .then(checkHttpCode)
    .then(resolve)
    .catch(error => {
        message.error(error.message);
    });
}

let post = (url, data, resolve) => {
    return fetch(url, {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        method: 'POST'
    })
    .then(parseJSON)
    .then(checkHttpCode)
    .then(resolve)
    .catch(error => {
        message.error(error.message);
    });
}

export {get, post};
