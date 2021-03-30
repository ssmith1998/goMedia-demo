
import Vue from 'vue' ;
const state = {
   books: Array
}

const mutations = {
    updateBooks(state, payload){
    
        state.books = payload;
    
    }
}

const actions = {
updateBooks({commit}, payload){
   

    commit('updateBooks',payload);
}
}

const getters = {
    books: state => {
        return state.books
      }

}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}