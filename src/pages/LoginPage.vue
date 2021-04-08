<template>
  <q-page class="flex flex-center" padding>
  <form @submit.prevent  class="q-gutter-md">
      <h4 class="text-center">Please login!</h4>
    <div class="row">
  <q-input class="q-mr-sm" outlined v-model="formData.email" label="Email" />
      <q-input outlined v-model="formData.password" type="password" label="Password" />
    </div>

    <div class="row">
        <q-btn @click="loginUser" label="Login" type="submit" color="primary"/>

    </div>
    
  </form>
  </q-page>
</template>

<script>
import Axios from "axios"
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'loginpage',

  data(){
    return{
      formData:{
        email:'',
        password:''
      }
     
    }
  },

  computed: {
     ...mapGetters('auth', ['isAuthenticated'])
  },

  methods: {
     ...mapActions('auth', ['updateAuthenticated', 'updateUsername', 'updateEmail', 'updateUser', 'updateToken']),
    loginUser(){
      Axios.post('http://127.0.0.1:8000/api/login', this.formData).then(response => {
       if(response.data.token){
          //set token in local storage
          localStorage.setItem('authToken', response.data.token.plainTextToken);
          console.log('login',response);
          this.updateUsername(response.data.user.name);
          this.updateEmail(response.data.user.email);
          this.updateAuthenticated(true);
          this.updateUser(response.data.user);
          this.updateToken(response.data.token.plainTextToken);
           this.$router.push({ name: 'dashboard'});
       }else{
       this.$q.notify({
        message: 'Invalid Credentials.',
        color: 'red'
      })
       }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.q-btn{
width: 100%;
}

</style>
