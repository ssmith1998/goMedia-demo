<template>
  <q-page class="" padding>
    <h2 class="text-center">Requests - {{requestType}}</h2>
 

  <div v-if="requestType === 'Sent'" class="q-pa-md">
    <q-table
       :title="'Requests - ' + requestType"
      :data="data"
      :columns="columns"
      row-key="name"

    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300"  placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

       <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round flat color="blue"  icon="edit"></q-btn>
              <q-btn dense round flat color="red"  icon="delete"></q-btn>
            </q-td>          
          </template>

    </q-table>
  </div>

   <div v-else class="q-pa-md">
    <q-table
       :title="'Requests - ' + requestType"
      :data="data2"
      :columns="columns2"
      row-key="name"

    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300"  placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- https://codepen.io/diego-cl/pen/gOwzYBq : pen for adding btn to table -->
       <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn @click="acceptRequest(props.row.ID)" dense round flat color="green"  icon="done"></q-btn>
              <q-btn dense round flat color="red"  icon="clear"></q-btn>
              <q-btn dense round flat color="red"  icon="delete"></q-btn>
            
            </q-td>          
          </template>

    </q-table>
  </div>

  <p>{{requests.length}}</p>


 
  

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
        { name: 'Author', label: 'Author', field: 'Author', sortable: true },
        { name: 'Accepted', label: 'Accepted', field: 'Accepted', sortable: true },
        { name: 'actions', label: 'Actions', field: 'Actions' },
        
      ],

      data:[],

      columns2:[
        { name: 'ID', align: 'center', label: '#', field: 'ID', sortable: true },
        { name: 'Book', label: 'Book', field: 'Book', sortable: true },
        { name: 'Author', label: 'Author', field: 'Author', sortable: true },
        { name: 'User', label: 'User', field: 'User', sortable: true },
        { name: 'actions', label: 'Actions', field: 'Actions' },
      ],

      data2:[]
    }
  },

  mounted(){
   this.requestType = this.$route.query.type;
   this.getRequests()
   this.getAllRequests()


  },

  computed: {
     ...mapGetters('auth', ['isAuthenticated', 'getUser']),
     ...mapGetters('marketplace', ['books', 'requests', 'recievedRequests']),
   
  },

  methods: {
    ...mapActions('marketplace', ['getBooks', 'updateRequests', 'getRecievedRequests','updateRecievedRequests', 'getAllRequests', 'confirmRequest']),


    getRequests(){
       let config = {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('authToken'),
              }
      }

  
      if(this.requestType === 'Recieved'){
        let recievedRequestsArray = [];

        for(let i = 0; i < this.requests.length; i++){
          if(this.requests[i].book.user_id === this.getUser.id && this.getUser.id !== this.requests[i].user_id && this.requests[i].request.deleted === 0  ){
          recievedRequestsArray.push(this.requests[i]);
          }
        }

        console.log('NEW',recievedRequestsArray)
     
          for(let i = 0; i < recievedRequestsArray.length; i++){
            this.data2.push({
              ID: recievedRequestsArray[i].request.id,
              Book: recievedRequestsArray[i].book.name,
              Author: recievedRequestsArray[i].book.author,
              User: recievedRequestsArray[i].user.name,
              Actions:'DELETE'
            })
        }
      
      }else{
         axios.get('http://127.0.0.1:8000/api/requests/sent', config).then(response => {
        console.log('SENT',response);

        for(let i = 0; i < response.data.requests.length; i++){
            this.data.push({
              ID: response.data.requests[i].id,
              Book: response.data.requests[i].book.name,
              Author: response.data.requests[i].book.author,
              Accepted: response.data.requests[i].accepted === 0 ? "No" : "Yes",
              Actions:'DELETE'
            })
        }

      })
      }
    },

    acceptRequest(requestId){
        this.$q.dialog({
        title: 'Accept',
        message: 'Would you like to Accept the Request?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      }
    }
          axios.get('http://127.0.0.1:8000/api/request/accept/'+requestId+'', config).then(response => {
        console.log('accept',response);
        this.confirmRequest(response.data.request);
        // this.getAllRequests();
      })
      })
       
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
