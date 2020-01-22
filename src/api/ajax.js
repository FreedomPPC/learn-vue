import Http from './http.js';

/**
 * ajax 请求示例
 */
async function doSomeAjax(params) {
    return Http.get('/200', {
        params
    });
}

export default {
    doSomeAjax
};
