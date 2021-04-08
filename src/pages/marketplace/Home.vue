<template>
  <q-page class="" padding>
    <h2 class="text-center">Marketplace</h2>
    <div class="menuWrapper" style="width:50%; margin:0px auto;">

    <q-btn color="purple" label="Requests" style="width:100%; margin:0px auto;">
      <q-menu fit>
        <div class="row no-wrap q-pa-md">
          <div class="col-12">
            <div class="text-h6 q-mb-md">Requests</div>
            <q-btn @click="$router.push({name: 'requests', query:{'type':'Recieved'}})" style="width:100%;" class='q-btn'>Recieved ({{requestRecievedCount}})</q-btn>
            <q-btn @click="$router.push({name: 'requests', query:{type:'Sent'}})" class='q-btn q-mt-sm'>Sent({{requestSentCount}})</q-btn>
          </div>
        </div>
      </q-menu>
    </q-btn>
    </div>
   <div class="row q-mt-sm">
     <Book v-for="book in books" :key="book.id" :userId="book.user_id" :id="book.id" :author="book.author" :title="book.name" :user="book.user.name"/>
   </div>

  </q-page>
</template>

<script>
// import Axios from "axios"
import axios from "../../axios/index"
import {mapActions, mapGetters} from "vuex";
import Book from '../../components/marketplace/Book';
export default {
  name: 'marketPlace',

  data(){
    return{
      card:false,
      requestRecievedCount:0,
      requestSentCount:0
    }
  },

  mounted(){
    this.getBooks();
    this.getRequestsSent();
  },

  computed: {
     ...mapGetters('auth', ['isAuthenticated', 'getUser']),
     ...mapGetters('marketplace', ['books', 'requests']),
   
  },

  methods: {
    ...mapActions('marketplace', ['getBooks']),

    getRequestsSent(){
       let sent = [];
      for(let i = 0; i < this.requests.length; i++){
       
        if(this.getUser.id === this.requests[i].user.id){
         sent.push(this.requests[i])
        }
      }
      this.requestSentCount = sent.length;
      console.log(this.requestSentCount);
    }


    },

    components:{ 
      Book
    }


  }

</script>

<style lang="scss" scoped>
.q-btn{
width: 100%;
}

.q-form {
  width: 75%;
}


.q-fab{
 width: 59px;
    height: 51px;
}



</style>
