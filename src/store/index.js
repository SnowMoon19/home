import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      token: '',
      username: '',
      userId: '',
    }
  },
  getters: {
    token: state => state.user.token,
    username: state => state.user.username,
    id: state => state.user.userId
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.user.token = token
    },
    SET_UNAME: (state, username) => {
      state.user.username = username
    },
    SET_ID: (state, id) => {
      state.user.userId = id
    }
  },
  actions: {
  },
  modules: {
  }
})
