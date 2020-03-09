<template>
    <div class="hello">
        <div class="login">
            <b-card title="Вход" style="max-width: 25rem">

                <b-form v-on:submit.prevent="logIn">

                    <b-form-input v-model="login" type="text" placeholder="Login"/>
                    <div class="mb-2"> </div>
                    <b-form-input v-model="password" type="password" placeholder="Password"/>

                    <div class="mb-4"> </div>
                    <input type="submit" value="Войти"/>
                </b-form>
                <p v-if="error" style="color: red"> какая-то ошибка </p>
            </b-card>
            <div>
                <router-link to="/registration"> Зарегистрироваться </router-link>
            </div>

            <div>
                <router-link to="/"> Авторизоваться через Google </router-link>
            </div>

        </div>
    </div>
</template>

<script>
    import api from '../api/backend-api'

    export default {
        name: 'hello',
        data() {
          return {
              profile: null,
              login: null,
              password: null,
              error: false
          }
        },
        methods: {
            logIn: function() {
                api.authUser({login: this.$data.login, password: this.$data.password})
                    .then(response => {
                        this.$store.dispatch('login', response.data);
                        this.$router.push('/messages/all');
                    })
                    .catch(e => {
                        console.log(e);
                        this.error = true;
                    });
            }
        }
    }
</script>

<style>
    .login {
        margin-left: 40%;
        margin-top: 10%;
    }
</style>