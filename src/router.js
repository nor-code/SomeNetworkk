import Vue from 'vue'
import Router from  'vue-router'

import Messages from './components/messages/Messages'
import Registration from './components/main/Registration'
import Hello from './components/main/Hello'
import UserPage from './components/user/UserPage'
import Admin from './components/admin/Admin'
import Profile from './components/user/Profile'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {path: '/',  component: Hello},
        {path: '/registration', component: Registration},
        {path: '/messages/:mySubscribe', component: Messages, props: true},
        {path: '/userPage', component: UserPage},
        {path: '/admin', component: Admin},
        {path: '/profile/:login', component: Profile, props: true}
    ]
});

export default router;