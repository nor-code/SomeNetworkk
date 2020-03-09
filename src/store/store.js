import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    login:     localStorage.getItem('login')      || '',
    token:     localStorage.getItem('token-user') || '',
    firstName: localStorage.getItem('firstName')  || '',
    userId:    localStorage.getItem('userId')     || '',
    roles:     localStorage.getItem('roles')      || ''
};

const getters = {
    isAuthenticated: state => {
        if (state.token != null && state.token != '') {
            return true;
        } else {
            return false;
        }
    },
    getUsername: state => {
        return state.firstName;
    },
    getToken: state => {
        return state.token;
    },
    getUserId: state => {
        return state.userId;
    },
    isAdmin: state => {
        return state.roles.indexOf('ADMIN') >= 0;
    },
    getLogin: state => {
        return state.login;
    }
};

const mutations = {
    auth_login: (state, user) => {
        localStorage.setItem('login',      user.login);
        localStorage.setItem('token-user', user.token);
        localStorage.setItem('firstName',  user.firstName);
        localStorage.setItem('userId',     user.userId);
        localStorage.setItem('roles',      user.roles);

        state.login = user.login;
        state.firstName = user.firstName;
        state.token = user.token;
        state.userId = user.userId;
        state.roles = user.roles;
    },
    auth_logout: () => {
        state.login     = '';
        state.firstName = '';
        state.token     = '';
        state.userId    = '';
        state.roles     = '';

        localStorage.removeItem('login');
        localStorage.removeItem('token-user');
        localStorage.removeItem('firstName');
        localStorage.removeItem('userId');
        localStorage.removeItem('roles');
    }
};

const actions = {
    login: (context, user) => {
        context.commit('auth_login', user);
    },
    logout: (context) => {
        context.commit('auth_logout');
    }
};


export const store = new Vuex.Store({
   state,
   getters,
   mutations,
   actions
});

