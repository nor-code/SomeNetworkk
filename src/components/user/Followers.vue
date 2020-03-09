<template>
    <div id="followers">
        <div v-if="followers.length > 0">
            <div v-for="follower in followers" :key="follower.login">
                <div class="my-2 card" style="width: 70%">
                    <div class="body" style="align-items: center; display: flex">
                        <div class="d-inline-block delimiter"><h4 class="mx-1">{{follower.login}}</h4>{{follower.firstName}} {{follower.lastName}}</div>
                        <div class="d-inline-block delimiter"><button variant="outline-primary" v-on:click="deleteFollower(follower.login)">Удалить</button></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h3>У Вас нет подписчиков...</h3>
        </div>
    </div>
</template>

<script>
    import api from '../api/backend-api';
    import {getIndex1} from '../../functions';

    export default {
        name: 'followers',
        data() {
            return {
                userId: this.$store.getters.getUserId,
                followers: [],
                header: {'Authorization': this.$store.getters.getToken}
            }
        },
        created: function() {
            api.getFollowers(this.userId, {headers: this.header})
                .then(response => response.data.forEach(f => this.followers.push(f)))
                .catch(e => console.log(e));
        },
        methods: {
            deleteFollower: function(login) {
                api.deleteFollower(this.userId, login, {headers: this.header})
                    .then(response => {
                        let index = getIndex1(this.followers, login);
                        this.followers.splice(index, 1);
                        console.log(response);
                    })
                    .catch(e => console.log(e))
            }
        }
    }
</script>

<style>

</style>