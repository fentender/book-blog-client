import store from "../store";
import {proxy} from "ajax-hook";

proxy({
    //请求发起前进入
    onRequest: (config, handler) => { 
        if(store.state.token != ''){
            config.headers.Authorization = 'Bearer ' + store.state.token;
        }store
        handler.next(config);
    },
    //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
    onError: (err, handler) => {
        console.log(err.type)
        handler.next(err)
    },
    //请求成功后进入
    onResponse: (response, handler) => {
        handler.next(response)
    }
})