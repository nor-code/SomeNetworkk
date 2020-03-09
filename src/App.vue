<template>
  <div id="app">
      <div>
          <b-navbar type="dark" variant="dark" v-if="$store.state.token">

              <b-navbar-brand href="#">SomeProduct</b-navbar-brand>
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

              <b-collapse id="nav-collapse" is-nav>
                  <b-navbar-nav>
                      <b-nav-item href="/messages/all">Главная</b-nav-item>
                  </b-navbar-nav>

                  <b-navbar-nav>
                      <b-nav-item href="/messages/mySubscribe">Мои подписки</b-nav-item>
                  </b-navbar-nav>

                  <b-navbar-nav>
                      <b-nav-item v-if="$store.getters.isAdmin" href="/admin">Администрирование</b-nav-item>
                  </b-navbar-nav>


                  <b-navbar-nav class="ml-auto">
                      <b-nav-form clas="mr-1">
                          <b-input-group>
                              <vue-bootstrap-typeahead
                                      input-class=""
                                      :data="users"
                                      v-model="login"
                                      :serializer = "s => s.login"
                                      placeholder="введите ник пользователя"
                                      :min-matching-chars=1
                                      backgroundVariant="#D7D7D7"
                                      v-on:hit="goToProfile(login)"
                              >
                              </vue-bootstrap-typeahead>
                          </b-input-group>
                      </b-nav-form>

                      <b-nav-item-dropdown right>
                          <template v-slot:button-content>
                             {{$store.getters.getUsername}}
                          </template>

                          <b-dropdown-item v-on:click="goToMyWall">Моя стена</b-dropdown-item>
                          <b-dropdown-item v-on:click="logOut">Выйти</b-dropdown-item>
                      </b-nav-item-dropdown>
                  </b-navbar-nav>

              </b-collapse>

          </b-navbar>
      </div>

      <router-view ></router-view>
  </div>
</template>

<script>
    import api from './components/api/backend-api';
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
    import _ from 'lodash';

    export default {
        name: 'app',
        components: {
            VueBootstrapTypeahead
        },
        data() {
            return {
                login: '',
                users: [],
                firstName: this.$store.getters.getUsername,
                isAuth: this.$store.getters.isAuthenticated,
                token: this.$store.getters.getToken
            }
        },
        methods: {
            getUsersBySublogin: function() {
                if (this.login.length !== 0) {
                    const header = {'Authorization': this.token};

                    api.searchUser(this.login, {headers: header})
                        .then(response => {this.users = response.data})
                        .catch(e => console.log(e));
                }
            },
            goToProfile: function(login) {
                this.$router.push('/profile/'+login);
            },
            logOut: function () {
                this.$store.dispatch('logout');
                this.$router.push('/');
            },
            goToMyWall: function() {
                this.$router.push('/userPage')
            }
        },
        watch: {
            login: _.debounce(function() { this.getUsersBySublogin() }, 500)
        }
    }
</script>

<style>
</style>
