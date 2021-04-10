<template>
<div class="bookWrapper q-px-sm col-12 col-md-6 q-py-sm">
<q-card
class="" 
id="book">
<div>


 <q-card-section>
   <p v-if="getUser.id == userId">This is your book {{getUser.name}}!</p>
        <div class="text-h6">{{title}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
            <p>{{author}}</p>
             <p>{{user}}</p>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="flex justify-between">
   
        <div class="q-card__actions flex content-center q-card__actions--horiz row justify-between ">
         
<div class="actionWrapper__right">
          <button v-if="getUser.id !== userId && isRequested === false"   @click="sendRequest(id)" id="requestBtn" tabindex="0" type="button" role="button" class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--wrap"><span class="q-focus-helper"></span><span class="q-btn__wrapper col row q-anchor--skip"><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="presentation" class="material-icons q-icon notranslate text-red">done</i></span></span></button>
          <button v-else-if="isRequested === true && getUser.id !== userId" disabled tabindex="0" type="button" role="button" class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--wrap"><span class="q-focus-helper"></span><span class="q-btn__wrapper col row q-anchor--skip"><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="presentation">request sent</i></span></span></button>
          <button tabindex="0" type="button" role="button" class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--wrap"><span class="q-focus-helper"></span><span class="q-btn__wrapper col row q-anchor--skip"><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="presentation" class="material-icons q-icon notranslate text-blue">visibility</i></span></span></button></div>
        </div>
      
        
          
          <button v-if="isRequested === true && getUser.id !== userId" type="button" role="button" class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--wrap"><span class="q-focus-helper"></span><span class="q-btn__wrapper col row q-anchor--skip"><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="presentation">View Request</i></span></span></button>
          
       
      </q-card-section>

</div>
</q-card>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import axios from '../../axios';
export default {
  name: 'Book',
  computed:{
    ...mapGetters('auth', ['isAuthenticated', 'getUser']),
    ...mapGetters('marketplace', ['requests']),
    
  },
  data(){
    return {
     isRequested:false
    }
  },

  mounted(){
   this.checkIfRequested();
  },
   props: ['title', 'author', 'user', 'id', 'userId'],


   methods: {
     ...mapActions('marketplace', ['updateRequests']),
     sendRequest(id){

this.$q.dialog({
        title: 'Send Request',
        message: 'Would you like to send a request for this book?',
        cancel: true,
        persistent: true
      }).onOk(() => {
         let config = {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('authToken'),
              }
      }
        axios.get('/request/send/'+id+'', config).then((response) => {
          console.log(response);
          if(response.data.request){
          this.updateRequests(response.data.request)
           this.checkIfRequested();
          }
        })
      })
     },

     checkIfRequested(){
       console.log(this.requests)
       for(let i = 0; i < this.requests.length; i++){
         if(this.id === this.requests[i].book_id && this.getUser.id === this.requests[i].user_id && this.requests[i].deleted === 0 ){
           this.isRequested = true;
           console.log('requested true')
         }
       }
     }
   }
}
</script>
