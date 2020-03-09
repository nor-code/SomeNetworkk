<template>
    <div class="registration">
        <b-card title="Регистрация" style="max-width: 35rem">
            <div>
                <b-form v-on:submit="onSubmit" v-on:reset="validate">
                    <b-form-group label="Email:">
                        <b-form-input
                                v-model="email"
                                type="email"
                                required
                                placeholder="Введите email"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Логин:">
                        <b-form-input
                                v-model="login"
                                required
                                placeholder="Придумайте логин"
                        ></b-form-input>
                    </b-form-group>


                    <b-form-group label="Имя:">
                        <b-form-input
                                v-model="firstName"
                                required
                                placeholder="Введите имя"
                        ></b-form-input>
                    </b-form-group>


                    <b-form-group label="Фамилия:" label-for="input-2">
                        <b-form-input
                                v-model="lastName"
                                required
                                placeholder="Введите фамилию"
                        ></b-form-input>
                    </b-form-group>


                    <b-form-group label="Пароль:" label-for="input-2">
                        <b-form-input
                                type="password"
                                v-model="password1"
                                required
                                placeholder="Придумайте пароль"
                        ></b-form-input>
                    </b-form-group>


                    <b-form-group label="Пароль:">
                        <b-form-input
                                type="password"
                                v-model="password2"
                                required
                                placeholder="Повторите пароль"
                        ></b-form-input>
                    </b-form-group>

                    <div class="my-3">
                        <vue-recaptcha
                                ref="recaptcha"
                                :sitekey="sitekey"
                                v-on:verify="onSubmit"
                                v-on:expired="onCaptchaExpired"
                        />
                    </div>

                    <b-button type="submit" variant="primary">Зарегестрироваться</b-button>
                    <b-button class="mx-1" type="reset" variant="danger">Сбросить</b-button>
                </b-form>
                <div v-for="e in errors" :key="e.length">
                    <p style="color: red"> {{e}} </p>
                </div>
            </div>
        </b-card>
    </div>

</template>

<script>
    import api from '../api/backend-api';
    import VueRecaptcha from 'vue-recaptcha';

    export default {
        name: 'registration',
        components: {VueRecaptcha},
        data() {
            return {
                email: null,
                login: null,
                firstName: null,
                lastName: null,
                password1: null,
                password2: null,
                errors: [],
                sitekey: '6LeGsMkUAAAAAHl8qs9UbtBrTYL4yYtHZxDpTu3P'
            }
        },
        methods: {
            onSubmit: function(recaptchaToken) {
                this.errors = null;
                if(!this.login || !this.firstName || !this.lastName || !this.password1 || !this.password2) {
                    this.errors.push('Заполните форму до конца!');
                } else if (this.password1 !== this.password2) {
                    this.errors.push('Пароли не совпадают!');
                } else {
                    debugger;
                    api.registrationNewUser({
                        email: this.email,
                        login: this.login,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        password: this.password1
                    }, recaptchaToken)
                    .then(response => {
                        this.errors = null;
                        this.$store.dispatch('login', response.data);
                        this.$router.push('/messages');
                        console.log("Created new User ");
                    })
                    .catch(e =>
                        console.log(e)
                    );
                }
            },
            onReset: function() {
                this.email = null;
                this.login = null;
                this.firstName = null;
                this.lastName = null;
                this.password1 = null;
                this.password2 = null;
            },
            validate: function() {
                debugger;
                this.$ref.recaptcha.execute();
            },
            onCaptchaExpired: function() {
                debugger;
                this.$ref.recaptcha.reset();
            }
        },
    }
</script>

<style>
    .registration {
        margin-left: 36%;
        margin-top: 5%;
    }
</style>