<template>
    <div id="profile">
        <div class="stylecard mt-4">

            <div class="card">
                <h5 class="card-header" style="text-align: center">{{login}}</h5>

                <div class="card-body my-body-card-profile" style="position: relative">

                    <h4 style="text-align: center"> {{user.firstName}} {{user.lastName}} </h4>

                    <div v-if="!yourProfile">
                        <div style="text-align: center">
                            <div>
                                <i v-if="!checkSubscribeYouOnThisUser()">
                                    <b-button v-on:click.prevent="subscribe()" class="btn btn-secondary active">Подписаться</b-button>
                                </i>
                                <i v-else> <b-button v-on:click.prevent="unsubscribe()" class="btn btn-secondary active">Отписаться</b-button></i>
                            </div>

                            <div class="mt-4"><i style="font-size: small" v-if="checkSelectedUserFollowYou()"> подписан(a) на Вас </i></div>
                        </div>
                    </div>


                    <div clas="mt-0">
                        <div class="d-inline-block" style="width: 50%">
                            <h3 style="text-align: center">{{countF}}</h3>
                            <p style="text-align: center">подписчики</p>
                        </div>

                        <div class="d-inline-block" style="width: 50%">
                            <h3 style="text-align: center">{{countS}}</h3>
                            <p style="text-align: center">подписки</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


        <!--<div style="z-index: 10; position: relative; border: 1px solid">-->
        <!--говно-->
        <!--<div style="z-index: 9; top: -20px; right: -10px; text-align: center; position: absolute; background-color: red; padding: 5px; border-radius: 100%">-->
        <!--10-->
        <!--</div>-->
        <!--</div>-->
</template>

<script>
    import api from '../api/backend-api';
    import {checkIn} from '../../functions';
    import {getIndex} from "../../functions";
    // import Followers from "Followers";
    // import Subscriptions from "Subscriptions";

    export default {
        name: 'profile',
        props: ['login'],
        data() {
            return {
                user: [],
                countF: '',
                countS: '',
                you: this.$store.getters.getUserId,
                header: {'Authorization': this.$store.getters.getToken},
                yourProfile: ''
            }
        },
        watch: {
            login: function () {
                this.getUserByLogin();
            }
        },
        created: function () {
            this.getUserByLogin();
        },
        methods: {
            getUserByLogin: function () {
                this.yourProfile = (this.login === this.$store.getters.getLogin);

                api.getUserByLogin(this.login, {headers: this.header})
                    .then(response => {
                        this.user = response.data;
                        this.countF = this.user.followers.length;
                        this.countS = this.user.subscriptions.length;
                    }).catch(e => console.log(e));
            },
            checkSelectedUserFollowYou: function () {
                return checkIn(this.user.subscriptions, this.you) >= 0;
            },
            checkSubscribeYouOnThisUser: function () {
                return checkIn(this.user.followers, this.you) >= 0;
            },
            subscribe: function () {
                const data = {userId: this.you, login: this.login};
                api.subscribe(data, {headers: this.header})
                    .then(response => {
                        if (response.status === 200) {
                            this.countF++;
                            this.user.followers.push(this.you);
                        }
                    });
            },
            unsubscribe: function () {
                api.unsubscribe(this.you, this.login, {headers: this.header})
                    .then(response => {
                        if(response.status === 200) {
                            this.countF--;
                            let index = getIndex(this.user.followers, this.you);
                            this.user.followers.splice(index, 1);
                        }
                    });
            }
        }
    }
</script>

<style>

    .stylecard {
        width: 50%;
        margin: 0 auto;
    }

    div ~ h3 {
        text-align: center;
    }

</style>