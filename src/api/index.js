import Vue from 'vue'
import axios from 'axios'
// import Notice from 'iview/src/components/notice'
// import VAlert from 'vuetify/src/components/alerts'


axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.response.use(res => {
    // console.log('res.data==',res.data)
    // if (res.data.status === 40101) {
    //     location.href = "/signup"
    //     return Promise.reject(res)
    // }
    if (res.data.status === 401) {
        location.href = "/login"
        return Promise.reject(res)
    }

    return res
}, err => {
    if (err.response.status === 401) {
        location.href = "/login"
        return Promise.reject(err)
    }
    if (err.response.status >= 500) {
        // Notice.error({
        //     title: '错误',
        //     desc: '您的网络开小差了，请稍候重试'
        // })
        // VAlert.error('您的网络开小差了，请稍候重试!')
        return Promise.reject(err)
    }
})

const isSign = url => /signin|signup/i.test(url)

const handle = (url, res, option) => option[res.data && res.status == 200 || isSign(url) ? 'success' : 'error'](res)

export function request(method, option) {
    return axios.request({
        method: method,
        ...option
    })
}

export function update(url, option) {
    return axios.request({
        method: 'put',
        url: url,
        ...option
    }).then(res => {
        handle(url, res, option)
    }).catch(res => {
        handle(url, res, option)
    })
}

export function del(url, option) {
    return axios.request({
        method: 'delete',
        url: url,
        ...option
    }).then(res => {
        handle(url, res, option)
    }).catch(res => {
        handle(url, res, option)
    })
}

export function get(url, params, option) {
    return axios.get(
        url, { params }
    ).then(res => {
        handle(url, res, option)
    }).catch(res => {
        handle(url, res, option)
    })
}

export function post(url, data, option) {
    return axios.post(
        url,
        data
    ).then(res => {
        handle(url, res, option)
    }).catch(res => {
        handle(url, res, option)
    })
}


export function api (params) {
    return {
        login: '/api/login',
        users: {
            list: '/api/users',
            create: '/api/users',   //post
            update: `/api/users/${params.user_id}` //delete, put
        },
        client: {
            list: '/api/clients',
            update: `/api/clients/${params.client_id || ''}`
        },
        sales: {
            list: '/api/sales'
        },
        price: {
            list: `/api/clients/${params.client_id || ''}/prices`
        },
        request: {
            list: `/api/ad_requests`
        }
    }
}

Vue.prototype.$http = axios