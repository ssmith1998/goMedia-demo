<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="isAuthenticated"
        />

        <q-toolbar-title class="absolute-center">
       Book Swap
        <span class="material-icons">library_books</span>
        </q-toolbar-title>

         <q-btn
          flat
          dense
          round
          icon="logout"
          v-if="isAuthenticated"
          class="absolute-right"
          @click="logout"
          
        />

       
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      v-if="isAuthenticated"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Navigation
          <div class="row">
            <p class="q-pt-sm"><strong>Hello {{username}}({{email}})</strong></p>
          </div>
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :Authenticated="link.Authenticated"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Axios from 'axios';

const linksData = [
  {
    title: 'Login',
    icon: 'login',
    link: '/login',
     Authenticated:false
  },
  {
    title: 'Register',
    icon: 'how_to_reg',
    link: '/register',
    Authenticated:false
  },

    {
    title: 'Dashboard',
    icon: 'dashboard',
    link: '/',
    Authenticated:true
  },

    {
    title: 'Logs',
    icon: 'analytics',
    link: '/logs',
    Authenticated:true
  },

   {
    title: 'Borrowing Marketplace',
    icon: 'local_library',
    link: '/borrowing/marketplace',
    Authenticated:true
  },

];

import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      authToken: localStorage.getItem('authToken'),
    
      
    }
  },
  methods:{
    ...mapActions('auth', ['updateAuthenticated']),
   logout(){
     localStorage.removeItem('authToken')
     this.updateAuthenticated(false);
     this.$router.push({name:'login'})
   },


  },

  computed: { 
    ...mapGetters('auth', ['isAuthenticated', 'username', 'email'])
  },

  mounted(){
     
  }
}
</script>
