<template>
  <q-page class="flex flex-center" padding>
   <q-form
      
      class="q-gutter-md"
    >
    <h3 class="text-center">Edit Book</h3>
      <q-input
        outlined
        v-model="formData.bookName"
        label="Name *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        outlined
        type="text"
        v-model="formData.bookAuthor"
        label="Author*"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"

      />

      <div>
        <q-btn label="Save" type="submit" color="primary" @click.prevent="editBook(bookId)"/>

      </div>
    </q-form>
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
        bookName:'',
        bookAuthor:''
      },
      bookId: this.$route.query.book
     
    }
  },

  computed: {
     ...mapGetters('auth', ['isAuthenticated'])
  },

  methods: {
     ...mapActions('auth', ['updateAuthenticated']),
     ...mapActions('books', ['updateBooks']),
    editBook(id){
         let config = {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('authToken'),
              }
      }
      Axios.post('http://127.0.0.1:8000/api/book/edit/', {name: this.formData.bookName,author:this.formData.bookAuthor, bookId:id}, config).then(response => {
        console.log(response);
        //check if response has succss true
         if(response.data.success === true){
          this.$q.notify({
        message: 'Book Updated succesfully!.',
        color: 'green'
      })
        this.updateBooks(response.data.books);
         }
      })
    },

    getBook(){
 let config = {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('authToken'),
              }
      }
        Axios.get('http://127.0.0.1:8000/api/book/'+this.bookId+'', config ).then(response => {
        console.log(response);
        this.formData.bookName = response.data.book.name;
        this.formData.bookAuthor = response.data.book.author;
       
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
