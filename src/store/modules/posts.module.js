import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      postsReq: [],
      postsRender: [],
      postsOrig: [],
      users: [],
      loading: true,
      error: '',
      search: ''
    }
  },
  mutations: {
    setPosts(state, post) {
      state.postsReq = post
    },
    setUsers(state, users) {
      state.users = users
    },
    setRender(state) {
     state.postsReq.forEach((i)=> {
        let authorFind = state.users.find(n => n.id == i.userId)
       state.postsRender.push({title: i.title, body: i.body, author: authorFind.name})
     })
    }
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.user.find(n => n.id == id)
    },
    filtered(state) {
      return state.postsRender.filter(item => item.author.indexOf('') !== -1)
    }
  },
  actions: {
    async getPosts({commit}) {
      try {
        const res = await axios.get('http://jsonplaceholder.typicode.com/posts')
        const resUsers = await axios.get('http://jsonplaceholder.typicode.com/users')
        commit('setPosts', res.data)
        commit('setUsers', resUsers.data)
        commit('setRender')
        this.state.posts.loading = false
      } catch (e) {
        this.state.posts.loading = false
        console.dir(e)
        this.state.posts.error = `Error response ${e.response.status} ${e.response.statusText}`
      }
    },
  }
}