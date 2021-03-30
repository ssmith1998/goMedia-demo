<template>
  <q-page padding>
   
    <h3 class="text-center">Book: {{bookName}}</h3>
      <p class="text-center">Author: {{bookAuthor}}</p>
    


      <div>


      </div>
  
  </q-page>
</template>

<script>
import Axios from "axios"
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'loginpage',

  data(){
    return{
     
        bookName:'',
        bookAuthor:'',
         bookId: this.$route.query.book
     
    }
  },

  computed: {
     ...mapGetters('auth', ['isAuthenticated'])
  },

  methods: {
     ...mapActions('auth', ['updateAuthenticated']),
     ...mapActions('books', ['updateBooks']),


    getBook(){
 let config = {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('authToken'),
              }
      }
        Axios.get('http://127.0.0.1:8000/api/book/'+this.bookId+'', config ).then(response => {
        console.log(response);
        this.bookName = response.data.book.name;
        this.bookAuthor = response.data.book.author;
       
      })
    }
    },

    mounted(){
        this.getBook();
    }


  }

</script>

<style lang="scss" scoped>
.q-btn{
width: 100%;
}

</style>
