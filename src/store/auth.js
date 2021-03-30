
import Vue from 'vue' ;
const state = {
   isAuthenticated: false,
   username:'',
   email:''

}

const mutations = {
    updateAuthenticated (state, payload) {
        // mutate state
        console.log(payload);
        state.isAuthenticated = payload
      },

      updateUsername (state, payload) {
        // mutate state
        console.log(payload);
        state.username = payload
      },

      updateEmail(state, payload) {
        // mutate state
        console.log(payload);
        state.email = payload
      }
}

const actions = {
updateAuthenticated({commit}, payload){
// console.log(payload);

commit('updateAuthenticated', payload)
},

updateUsername({commit}, payload){
    // console.log(payload);
    
    commit('updateUsername', payload)
    },

    updateEmail({commit}, payload){
        // console.log(payload);
        
        commit('updateEmail', payload)
        }
}

const getters = {
    isAuthenticated: state => {
        return state.isAuthenticated
      },

      username: state => {
            return state.username
      },

      email: state => {
        return state.email
  }

}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}