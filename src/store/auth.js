import axios from 'src/axios';
import Vue from 'vue';
const state = {
  isAuthenticated: false,
  username: '',
  email: '',
  user: Object,
  token: ''

}

const mutations = {
  updateAuthenticated(state, payload) {
    // mutate state
    console.log(payload);
    state.isAuthenticated = payload
  },

  updateUsername(state, payload) {
    // mutate state
    console.log(payload);
    state.username = payload
  },

  updateEmail(state, payload) {
    // mutate state
    console.log(payload);
    state.email = payload
  },

  updateUser(state, payload) {
    state.user = payload
  },

  updateToken(state, payload) {
    state.token = payload
  }
}

const actions = {
  updateAuthenticated({
    commit
  }, payload) {
    // console.log(payload);

    commit('updateAuthenticated', payload)
  },

  updateUsername({
    commit
  }, payload) {
    // console.log(payload);

    commit('updateUsername', payload)
  },

  updateEmail({
    commit
  }, payload) {
    // console.log(payload);

    commit('updateEmail', payload)
  },

  updateUser({
    commit
  }, payload) {
    commit('updateUser', payload)
  },

  updateToken({
    commit
  }, payload) {
    commit('updateToken', payload)
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
  },

  getUser: state => {
    return state.user
  },

  token: state => {
    return state.token
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
