import axios from 'axios'

export default {
    registrationNewUser(data, recaptchaToken) {
        return axios.post(`/api/registration/${recaptchaToken}`, data);
    },
    authUser(data) {
        return axios.post(`/api/auth`, data);
    },
    getAllMessages(data) {
        return axios.get(`/api/allMessage`, data);
    },
    getMessageByUser(id, data) {
        return axios.get(`/api/messageUser/${id}`, data)
    },
    postNewMessage(data, headers) {
        return axios.post(`/api/createMessage`, data, headers);
    },
    getAllUsers(data) {
        return axios.get(`/api/admin/getAllUsers`, data);
    },
    deleteMessage(id, data) {
        return axios.delete(`/api/deleteMessage/${id}`, data);
    },
    likeThisMessage(data, headers) {
        return axios.put(`/api/likeThisMessage/`, data, headers);
    },
    getSubscriptions(userId, headers) {
        return axios.get(`/api/getSubscriptions/${userId}`, headers);
    },
    getFollowers(userId, headers) {
        return axios.get(`/api/getFollowers/${userId}`, headers);
    },
    unsubscribe(userId, login, headers) {
        return axios.delete(`/api/unsubscribe/${userId}/${login}`, headers);
    },
    subscribe(data, headers) {
        return axios.put(`/api/subscribe`, data, headers);
    },
    deleteFollower(userId, login, headers) {
        return axios.delete(`/api/deleteFollower/${userId}/${login}`, headers);
    },
    searchUser(subLogin, headers) {
        return axios.get(`/api/searchUser/${subLogin}`, headers);
    },
    getUserByLogin(login, headers) {
        return axios.get(`/api/getUserByLogin/${login}`, headers);
    },
    getMessagesFromSubscribe(userId, headers) {
        return axios.get(`/api/getMessagesFromMySubscribe/${userId}`, headers);
    }
}

