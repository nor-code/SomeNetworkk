<template>
    <div id="userPage" style="display: flex; height: 900px">

        <div class="h-auto d-inline-block mt-0" style="width: 15%">
            <b-nav vertical>
                <!--<b-nav-item v-bind:href="hrefProfile"><div class="text">Профиль</div></b-nav-item>-->
                <b-nav-item v-b-modal.modal-1><div class="text">Подписки</div></b-nav-item>
                <b-nav-item v-b-modal.modal-2><div class="text">Подписчики</div></b-nav-item>
                <!--<b-nav-item> <div class="text">Запросы на подписку</div> </b-nav-item>-->
            </b-nav>


            <b-modal id="modal-1" title="Подписки" hide-footer>
                <subscription></subscription>
            </b-modal>


             <b-modal id="modal-2" title="Подписчики" hide-footer>
                <followers></followers>
            </b-modal>

        </div>

        <div class="h-80 d-inline-block ml-5" style="width: 40%">

            <div class="mt-3 b-popover-dark">
                <b-button v-b-modal.writeMessage>Написать сообщение</b-button>

                <b-modal id="writeMessage" ref="createMessage" title="Написать сообщение" hide-footer>
                    <div>
                        <form v-on:submit.prevent="addNewMessage">
                            <div class="mb-4">
                                <textarea class="form-control" v-model="text" placeholder="поделитесь своими мыслями..."></textarea>
                            </div>

                            <div>
                                <input type="file" v-on:change="onFileChanged" value="прикрепите изображенеие">
                            </div>

                            <b-button class="mt-2" type="submit" block>Создать</b-button>
                        </form>
                        <p v-if="error" class="mt-2"> Сообщение не может быть пустым!</p>
                    </div>
                </b-modal>
            </div>

            <div v-for="message in messagesUser" :key="message.id">
                <div class="my-3">
                    <b-card >

                        <button type="button" class="close" aria-label="Add" v-on:click="deleteMessage(message.id)">
                        <span aria-hidden="false">&times;</span>
                        </button>

                        <img v-if="message.image" class="card-img-top" :src="message.image" alt="Card image cap">

                        <b-card-text>
                            {{message.text}}
                        </b-card-text>

                        <div style="display: flex">
                            <span>{{message.createDate}}</span>

                            <span style="margin-left: auto; margin-right: 0">
                                    <a v-on:click.prevent="likeThis(message.id)"
                                       v-bind:class="{liked: message.likeThis, notLiked: !likeThis}"
                                       class="like-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.5em" height="1.5em" viewBox="0 0 32 32">
                                            <defs>
                                                <path class="path1" d="M29.193 5.265c-3.629-3.596-9.432-3.671-13.191-.288-3.76-3.383-9.561-3.308-13.192.288-3.741 3.704-3.741 9.709 0 13.415 1.069 1.059 11.053 10.941 11.053 10.941 1.183 1.172 3.096 1.172 4.278 0 0 0 10.932-10.822 11.053-10.941 3.742-3.706 3.742-9.711-.001-13.415zm-1.425 12.003l-11.053 10.941c-.393.391-1.034.391-1.425 0l-11.053-10.941c-2.95-2.92-2.95-7.671 0-10.591 2.844-2.815 7.416-2.914 10.409-.222l1.356 1.22 1.355-1.22c2.994-2.692 7.566-2.594 10.41.222 2.95 2.919 2.95 7.67.001 10.591zm-18.515-9.767c.277 0 .5.224.5.5s-.224.5-.5.5h-.001c-1.794 0-3.249 1.455-3.249 3.249v.001c0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-2.346 1.901-4.247 4.246-4.249l.004-.001z" id="a"/>
                                            </defs>
                                            <use xlink:href="#a"/>
                                        </svg>
                                    </a>
                                    {{message.count_like}}
                            </span>
                        </div>
                    </b-card>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import api from '../api/backend-api.js';
    import {getIndex} from "../../functions";
    import Subscription from "./Subscriptions";
    import Followers from "./Followers";

    export default {
        name: 'userPage',
        components: {
            Subscription,
            Followers
        },
        data() {
            return {
                error: false,
                text: null,
                file: null,
                messagesUser: [],
                login: this.$store.getters.getLogin,
                isAuth: this.$store.getters.isAuthenticated,
                userId: this.$store.getters.getUserId,
                header: {'Authorization': this.$store.getters.getToken},
                hrefProfile: '/profile/' + this.$store.getters.getLogin
            }
        },
        created: function() {
            api.getMessageByUser(this.userId, {headers: this.header})
                .then(response => {
                    response.data.forEach(message => this.messagesUser.push(message))
                });
        },
        methods: {
            onFileChanged: function(event) {
                this.file = event.target.files[0];
            },
            addNewMessage: function () {

                if(this.text != null && this.text !== '') {
                    this.error = false;

                    let data = new FormData();
                    data.append("text", this.text);
                    data.append("author", this.login);
                    data.append("file", this.file);

                    api.postNewMessage(data, {headers: this.header})
                        .then(response => {
                            this.messagesUser.unshift(response.data);
                            this.text = null;
                            this.file = null;
                            this.$refs['createMessage'].hide();
                        });
                } else {
                    this.error = true;
                }
            },
            deleteMessage: function (id) {

                api.deleteMessage(id, {headers: this.header})
                    .then(result => {
                        let index = getIndex(this.messagesUser, id);
                        this.messagesUser.splice(index, 1);
                        console.log(result)
                    })
                    .catch(e => console.log(e));
            },
            likeThis: function(messageId) {

                api.likeThisMessage({userId: this.userId, messageId: messageId}, {headers: this.header})
                    .then(response => {
                        let index = getIndex(this.messagesUser, messageId);
                        this.messagesUser.splice(index, 1, response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    }
</script>

<style>
    .text {
        color: black;
    }
    .delimiter {
        width: 50%;
        height: 100%;
        margin-top: 0;
    }
</style>