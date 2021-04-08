import Vue from 'vue';
import axios from 'axios';

const state = {
  books: Array,
  requests: []
}

const mutations = {
  updateBooks(state, payload) {

    state.books = payload;

  },

  updateRequests(state, payload) {
    state.requests.push(payload);

  }
}

const actions = {
  getBooks({
    commit
  }) {
    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      }
    }

    axios.get('http://127.0.0.1:8000/api/books/available', config).then(response => {
      console.log('books', response.data.books);
      commit('updateBooks', response.data.books);
    })
  },

  getRequests({
    commit
  }) {
    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      }
    }
    axios.get('http://127.0.0.1:8000/api/requests/made', config).then(response => {
      console.log('requests', response);
      commit('updateRequests', response.data.requests);
    })
  },

  updateRequests({
    commit
  }, payload) {
    commit('updateRequests', payload);
  },

  updateBooks({
    commit
  }, payload) {


    commit('updateBooks', payload);
  }
}

const getters = {
  books: state => {
    return state.books
  },

  requests: state => {
    return state.requests
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
