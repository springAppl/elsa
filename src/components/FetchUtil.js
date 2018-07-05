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
let put = (url, data, resolve) => {
    return fetch(url, {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        method: 'PUT'
    })
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
        method: 'POST',
        redirect: "follow"
    }).then((response) => {
        console.log(response)
    });
    // .then(checkRedirect);
    // .then(parseJSON)
    // .then(checkHttpCode)
    // .then(resolve)
    // .catch(error => {
    //     message.error(error.message);
    // });
}
let checkRedirect = (response) => {
    console.log(response)
    if (response.status >= 200 && response.status < 300) {
        return response
    } else if(response.status >= 300 && response.status < 400) {
        console.log('go redirect')
        this.props.history.push('/');
    }
}
export {get, post, put, postURL};
