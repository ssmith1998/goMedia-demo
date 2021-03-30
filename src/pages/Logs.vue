<template>
  <q-page padding>

<q-input outlined width="75px" v-model="search" label="Search" @keyup="filter"/>

   <div class="q-pa-md">
    <q-table
      title="Logs"
      :data="data"
      :columns="columns"
      row-key="name"
    />
  </div>
    


      <div>


      </div>
  
  </q-page>
</template>

<script>
import Axios from "axios"
import {mapActions, mapGetters} from "vuex";
import { date } from 'quasar'

export default {
  name: 'Logs',

methods:{
    getLogs(){
         let config = {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('authToken'),
              }
      }
        Axios.get('http://127.0.0.1:8000/api/logs', config).then(response => {
            // console.log(response.data.logs[0].action);

            

                for(let i = 0; i < response.data.logs.length; i++){
                      
                    console.log(response.data.logs[i])
                    this.data.push(
                        {
                        'user': response.data.logs[i].user_id,
                        'action': response.data.logs[i].action,
                        'dateAdded': response.data.logs[i].created_at 
                    }
                    )
                }
        })
    },

    filter(){
          let config = {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('authToken'),
              }
      }
        Axios.post('http://127.0.0.1:8000/api/logs/filter',{search: this.search}, config).then(response => {
            console.log(response.data.logs);

            this.data = [];

                for(let i = 0; i < response.data.logs.length; i++){

                    console.log(response.data.logs[i])
                    this.data.push(
                        {
                        'user': response.data.logs[i].user_id,
                        'action': response.data.logs[i].action,
                        'dateAdded': response.data.logs[i].created_at 
                    }
                    )
                }
        })
    }


},

data(){
    return{

        columns: [
        
        { name: 'user', align: 'center', label: 'User', field: 'user', sortable: true },
        { name: 'action', label: 'Action', field: 'action', sortable: true },
        { name: 'dateAdded', label: 'Date Added', field: 'dateAdded' }
        
      ],

      data:[
      
        
      ],
      search:''
    }
},


mounted(){
    this.getLogs();
},







  }

</script>

<style lang="scss" scoped>


</style>
