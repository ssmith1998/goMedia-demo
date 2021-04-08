<template>
  <q-page class="">
  <div class="wrapper" >
   
      <div class="headerWrapper">
       
        <h2 class="q-m-0">Books</h2>
        
          <q-btn color="primary" @click.prevent="addBook()"> Add Book<q-icon name="edit" color="yellow"   /></q-btn>
      </div>

        <div v-if="books.length > 0" class="listing-wrapper row">
          <div class="col-12 col-sm-6 q-pa-sm" v-for="book in books" v-bind:key="book.id">
        <q-card class="bg-primary">
        
        <q-card-section>
          <h5 class="text-white"><strong>Title :{{book.name}}</strong></h5>
          <h6 class="text-white" >Author :{{book.author}}</h6>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex content-center">
          <q-btn flat @click.prevent="editBook(book.id)"> <q-icon name="edit" color="yellow"   /></q-btn>
          <q-btn flat @click.prevent="deleteBook(book.id)"> <q-icon name="delete" color="red"  /></q-btn>
        <q-btn flat @click.prevent="viewBook(book.id)"><q-icon name="visibility" color="white"   /></q-btn>
        
        </q-card-actions>
      </q-card>
      </div>
     </div>

     <div v-else class="noBooks">
       <q-card class="q-pa-md">
        <h6 class="text-center">There are no books in your library!</h6> 
       </q-card>
     </div>

      


    
  </div>

  </q-page>
</template>

<script>
import Axios from 'axios';
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'dashboard',

  computed:{
    ...mapGetters('books', ['books'])
  },

  methods:{
    ...mapActions('books', ['updateBooks']),
    getBooks(){
      let config = {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('authToken'),
              }
      }

      Axios.get('http://127.0.0.1:8000/api/books', config).then(response => {
        console.log(response);
        this.updateBooks(response.data.books);
      })
    },

    deleteBook(id){
        let config = {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('authToken'),
              }
      }
        Axios.get('http://127.0.0.1:8000/api/book/delete/'+id+'', config).then(response => {
        console.log(response);
            this.$q.notify({
        message: 'Book Deleted.',
        color: 'red'
      })
        this.updateBooks(response.data.books);
      })
    },

     addBook(){
        this.$router.push('addBook');
    },

  
         editBook(id){
       this.$router.push({name:'editBook', query:{book:id}});

        },

           viewBook(id){
       this.$router.push({name:'viewBook', query:{book:id}});

        },
    
  
    
  },

  mounted(){
    this.getBooks();
  
  },



  data(){

    return{
 

     
    }
  
    
    }
  }

</script>

<style lang='scss'>

.wrapper{
  width: 75%;
  margin: 0px auto;

 
.headerWrapper{
display:flex;
align-items: center;
justify-content: space-between;
.q-icon {
  margin-left: 50px;
  font-size: 30px;
}
}

h5,h6{
  margin: 0px;
}
}
</style>
