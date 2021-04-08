import axios from 'axios';
import Vue from 'vue'

export default axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('authToken')
  }
})
