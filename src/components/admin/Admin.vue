<template>
    <div id="admin">
        <div class="mx-lg-5 mt-lg-5">
            <b-table striped hover :items="users" :fields="fields"></b-table>
        </div>
    </div>
</template>

<script>
    import api from '../api/backend-api'

    export default {
        name: 'admin',
        data() {
            return {
                fields: [
                    {
                        key: 'firstName',
                        label: 'Имя',
                        sortable: true
                    },
                    {
                        key: 'lastName',
                        label: 'Фамилия'
                    },
                    {
                        key: 'messages',
                        label: 'Сообщения',
                        sortable: true
                    },
                    {
                        key: 'roles',
                        label: 'Роли'
                    }
                ],
                users: [],
            }
        },
        created: function () {
            const header = {'Authorization': localStorage.getItem('token-user')};
            api.getAllUsers({headers: header})
                .then(response => response.data.forEach(user => {
                    user.messages = user.messages.length;
                    user.roles = user.roles.toString();

                    this.users.push(user);
                }))
                .catch(e => console.log(e));

        }
    }
</script>

<style>

</style>