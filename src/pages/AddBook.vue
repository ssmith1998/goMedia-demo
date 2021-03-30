<template>
  <q-page class="flex flex-center" padding>
   <q-form
      
      class="q-gutter-md"
    >
    <h3 class="text-center">Add Book</h3>
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
        <q-btn label="Save" type="submit" color="primary" @click.prevent="addBook()"/>

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
    addBook(){
      let config = {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('authToken'),
              }
      }
      Axios.post('http://127.0.0.1:8000/api/book/new/', {name: this.formData.bookName,author:this.formData.bookAuthor}, config).then(response => {
      
          this.$q.notify({
        message: 'Book Added to your Library!.',
        color: 'green'
      })
          this.updateBooks(response.data.books);
       
      
      })
    },
    },


  }

</script>

<style lang="scss" scoped>
.q-btn{
width: 100%;
}

</style>
