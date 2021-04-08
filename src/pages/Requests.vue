<template>
  <q-page class="" padding>
    <h2 class="text-center">Requests - {{requestType}}</h2>
   <div class="tableWrapper">
    <q-table
      :title="'Requests - ' + requestType"
      :data="data"
      :columns="columns"
      row-key="id"
    />

   </div>

  </q-page>
</template>

<script>
import axios from "axios"

import {mapActions, mapGetters} from "vuex";
export default {
  name: 'Requests',

  data(){
    return{
    requestType:'',
     columns: [
      
        { name: 'ID', align: 'center', label: '#', field: 'ID', sortable: true },
        { name: 'Book', label: 'Book', field: 'Book', sortable: true },
        { name: 'Accepted', label: 'Accepted', field: 'Accepted', sortable: true },
        { name: 'Actions', label: 'Actions', field: 'Actions' },
        
      ],

      data:[]
    }
  },

  mounted(){
   this.requestType = this.$route.query.type;
   this.getRequests()
  },

  computed: {
     ...mapGetters('auth', ['isAuthenticated', 'getUser']),
     ...mapGetters('marketplace', ['books', 'requests']),
   
  },

  methods: {
    ...mapActions('marketplace', ['getBooks']),


    getRequests(){
       let config = {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('authToken'),
              }
      }
      if(this.requestType === 'Recieved'){
        axios.get('http://127.0.0.1:8000/api/requests/recieved', config).then(response => {
        console.log('recieved',response);
      })
      }else{
         axios.get('http://127.0.0.1:8000/api/requests/sent', config).then(response => {
        console.log(response);

        for(let i = 0; i < response.data.requests.length; i++){
            this.data.push({
              ID: response.data.requests[i].id,
              Book: response.data.requests[i].book_id,
              Accepted: response.data.requests[i].accepted === 0 ? "No" : "Yes",
              Actions: ''
            })
        }

      })
      }
    }



    },

    components:{ 
      
    }


  }

</script>

<style lang="scss" scoped>
.tableWrapper{
  width: 75%;
  margin: 0px auto;
}



</style>
