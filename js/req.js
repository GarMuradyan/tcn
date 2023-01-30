function req(method,url,params) {

    return axios({
        method:method,
        url:url,
        params:params
    })
}