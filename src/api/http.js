import axios from 'axios';
// 通过环境变量注入请求接口host，如果调用的url不是完整格式url，会默认加上该host
axios.defaults.baseURL = process.env.VUE_APP_API_HOST; 

const Http = {
    get: function(url, options = {}) {
        return new Promise((resolve, reject)=> {
            const defaultOptions = {
                timeout: 10000,
                // withCredentials: true,
                responseType: 'json'
            };

            Object.assign(defaultOptions, options);
            axios.get(url, defaultOptions).then(response=> {
                resolve(response.data);
            }).catch(err=> {
                this._errHandle(err);
                reject(err);
            });
        });
    },
    delete: function(url, options = {}) {
        return new Promise((resolve, reject)=> {
            const defaultOptions = {
                timeout: 10000,
                // withCredentials: true,
                responseType: 'json'
            };

            Object.assign(defaultOptions, options);
            axios.delete(url, defaultOptions).then(response=> {
                resolve(response.data);
            }).catch(err=> {
                this._errHandle(err);
                reject(err);
            });
        });
    },
    post: function({url, data, options}) {
        return new Promise((resolve, reject)=> {
            const defaultOptions = {
                timeout: 10000,
                // withCredentials: true,
                responseType: 'json'
            };

            Object.assign(defaultOptions, options);
            axios.post(url, data, defaultOptions).then(response=> {
                resolve(response.data);
            }).catch(err=> {
                this._errHandle(err);
                reject(err);
            });
        });
    },
    put: function({url, data, options}) {
        return new Promise((resolve, reject)=> {
            const defaultOptions = {
                timeout: 10000,
                // withCredentials: true,
                responseType: 'json'
            };

            Object.assign(defaultOptions, options);
            axios.put(url, data, defaultOptions).then(response=> {
                resolve(response.data);
            }).catch(err=> {
                this._errHandle(err);
                reject(err);
            });
        });
    },
    _errHandle: function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
};

export default Http;
