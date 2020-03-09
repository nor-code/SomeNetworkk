<template>
    <div id="like">
        <a v-on:click.prevent="likeThis(messageId)"
           v-bind:class="{liked: likedThis, notLiked: !likedThis}"
           class="like-icon">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.5em" height="1.5em" viewBox="0 0 32 32">
                <defs>
                    <path class="path1" d="M29.193 5.265c-3.629-3.596-9.432-3.671-13.191-.288-3.76-3.383-9.561-3.308-13.192.288-3.741 3.704-3.741 9.709 0 13.415 1.069 1.059 11.053 10.941 11.053 10.941 1.183 1.172 3.096 1.172 4.278 0 0 0 10.932-10.822 11.053-10.941 3.742-3.706 3.742-9.711-.001-13.415zm-1.425 12.003l-11.053 10.941c-.393.391-1.034.391-1.425 0l-11.053-10.941c-2.95-2.92-2.95-7.671 0-10.591 2.844-2.815 7.416-2.914 10.409-.222l1.356 1.22 1.355-1.22c2.994-2.692 7.566-2.594 10.41.222 2.95 2.919 2.95 7.67.001 10.591zm-18.515-9.767c.277 0 .5.224.5.5s-.224.5-.5.5h-.001c-1.794 0-3.249 1.455-3.249 3.249v.001c0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-2.346 1.901-4.247 4.246-4.249l.004-.001z" id="a"/>
                </defs>
                <use xlink:href="#a"/>
            </svg>
        </a>
    </div>
</template>

<script>
    import api from '../api/backend-api'
    import {getIndex} from '../../functions'

    export default {
        name: 'like',
        props: ['messageId', 'likedThis', 'messages', 'userId'],
        methods: {
            likeThis: function(messageId) {
                debugger;
                api.likeThisMessage({userId: this.userId, messageId: messageId}, {headers: {'Authorization': this.$store.getters.getToken}})
                    .then(response => {
                        let index = getIndex(this.messages, messageId);
                        this.likedThis = response.data.likedThis;
                        this.messages.splice(index, 1, response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }

    }
</script>

<style>
    .liked {
        fill: red;
    }
    .notLiked {
        fill: black;
    }
</style>