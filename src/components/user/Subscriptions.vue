<template>
    <div id="subscriptions">

        <div v-if="subscriptions.length > 0">
            <div v-for="subscription in subscriptions" :key="subscription.login" style="width: 100%">
                <div class="my-2 card" style="width: 70%">
                    <div class="body" style=" display: flex; align-items: center">
                        <div class="d-inline-block delimiter">
                            <h4 class="mx-1">{{subscription.login}}</h4>
                            {{subscription.firstName}} {{subscription.lastName}}
                        </div>

                        <div class="d-inline-block delimiter">
                            <div class="ml-4 my-auto"><button variant="outline-primary" v-on:click="unsubscribe(subscription.login)">Отписаться</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h3>Вы ни на кого не подписаны...</h3>
        </div>

    </div>
</template>

<script>
    import api from '../api/backend-api';
    import {getIndex1} from '../../functions';

    export default {
        name: 'subscription',
        data() {
            return {
                userId: this.$store.getters.getUserId,
                subscriptions: [],
                header: {'Authorization': this.$store.getters.getToken }
            }
        },
        created: function () {
            api.getSubscriptions(this.userId, {headers: this.header})
                .then(response => response.data.forEach(s => this.subscriptions.push(s)))
                .catch(e => console.log(e));
        },
        methods: {
            unsubscribe: function(login) {
                api.unsubscribe(this.userId, login, {headers: this.header})
                    .then(response => {
                        let index = getIndex1(this.subscriptions, login);
                        this.subscriptions.splice(index, 1);
                        console.log(response);
                    })
                    .catch(e => console.log(e))
            }
        }
    }
</script>

<style>
</style>