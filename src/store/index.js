import { createStore } from 'vuex'
import posts from './modules/posts.module'

export default createStore({
    modules: {
        posts,
    }
})