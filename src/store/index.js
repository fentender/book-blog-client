import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new  Vuex.Store({
    state: {
        token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : '',
        username: sessionStorage.getItem("username") ? sessionStorage.getItem("username") : ' '
    },
    mutations: {
        setToken(state, token) {
            state.token = token.token;
            sessionStorage.setItem("token", state.token);
        }, 
        delToken(state) {
            state.token = '';
            sessionStorage.removeItem("token");
        },
        setUser(state, user) {
            state.username = user.username;
            sessionStorage.setItem("username", state.username);
            
        }, 
        delUser(state) {
            state.username = '';
            sessionStorage.removeItem("username");
        }
    }
})



export default store;