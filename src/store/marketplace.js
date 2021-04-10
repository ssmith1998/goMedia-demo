import Vue from 'vue';
import axios from 'axios';

const state = {
  books: Array,
  requests: [],

}

const mutations = {
  updateBooks(state, payload) {

    state.books = payload;

  },

  updateRequests(state, payload) {

    if (payload instanceof Array) {

      state.requests = payload;


    } else {
      state.requests.push(payload);
    }




  },


  acceptRequest(state, payload) {
    console.log(payload.id);
    for (let i = 0; i < state.requests.length; i++) {
      if (state.requests[i].id === payload.id) {
        state.requests.splice(i, 1);
      }

    }
  },

  updateRecievedRequests(state, payload) {
    console.log('mutateRecieved', payload)

    if (payload instanceof Array) {

      state.recievedRequests = payload;


    } else {
      state.recievedRequests.push(payload);
    }

  },
  updateSentRequests(state, payload) {

    if (payload instanceof Array) {

      state.requests = payload;


    } else {
      state.requests.push(payload);
    }




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

  getAllRequests({
    commit
  }) {
    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      }
    }
    axios.get('http://127.0.0.1:8000/api/requests', config).then(response => {
      console.log('requests', response);
      commit('updateRequests', response.data.requests);
    })
  },

  getRecievedRequests({
    commit
  }) {
    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      }
    }
    axios.get('http://127.0.0.1:8000/api/requests/recieved', config).then(response => {
      console.log('recieved', response);
      commit('updateRecievedRequests', response.data.requests)
    })
  },

  updateRequests({
    commit
  }, payload) {
    commit('updateRequests', payload);
  },

  confirmRequest({
    commit
  }, payload) {
    commit('acceptRequest', payload);
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
  },

  recievedRequests: state => {
    return state.recievedRequests
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
