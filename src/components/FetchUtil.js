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
        credentials: 'same-origin',
        mode: 'no-cors'
    })
    .then(checkRedirect)
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
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        method: 'POST'
    })
    .then(checkRedirect)
    .then(parseJSON)
    .then(checkHttpCode)
    .then(resolve)
    .catch(error => {
        message.error(error.message);
    });
}
let put = (url, data, resolve) => {
    return fetch(url, {
        credentials: 'same-origin',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        method: 'PUT'
    })
    .then(checkRedirect)
    .then(parseJSON)
    .then(checkHttpCode)
    .then(resolve)
    .catch(error => {
        message.error(error.message);
    });
}
let postURL = (url, resolve) => {
    return fetch(url, {
        credentials: 'same-origin',
        mode: 'no-cors',
        method: 'POST',
        redirect: "follow"
    })
    .then(checkRedirect)
    .then(parseJSON)
    .then(checkHttpCode)
    .then(resolve)
    .catch(error => {
        message.error(error.message);
    });
}
let checkRedirect = (response) => {
    if (response.redirected) {
        return window.location = response.url;
    } else {
        return response;
    }
}
export {get, post, put, postURL};