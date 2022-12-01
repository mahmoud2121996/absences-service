export const get = (url, retries = 3) => {
    return fetch(url, {
        method: 'GET'
    }).catch((error) => handleFailure(error, url, retries, get));
}


const handleFailure = (error, url, retries, handleRetry) => {
    console.log(error);
    if (retries > 0) {
        return handleRetry(url, retries = retries - 1)
    }
}


const httpUtils = {
    get
};

export default httpUtils;