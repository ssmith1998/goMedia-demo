
import Vue from 'vue' ;
const state = {
   isAuthenticated: false
}

const mutations = {
    updateAuthenticated (state, payload) {
        // mutate state
        console.log(payload);
        state.isAuthenticated = payload
      }
}

const actions = {
updateAuthenticated({commit}, payload){
// console.log(payload);

commit('updateAuthenticated', payload)
}
}

const getters = {
    isAuthenticated: state => {
        return state.isAuthenticated
      }

}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}