<template>
  <div class="container d-flex justify-content-center mt-5" v-if="$store.state.posts.loading">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
  <div class="container-fluid d-flex px-3" v-if="filtered.length > 0">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 justify-content-center">
      <div class="card m-2" v-for="item in filtered">
        <div class="card-body">
        <h4 class="card-title text-primary">{{ item.title }}</h4>
        <div class="card-text">{{ item.body }}</div>
          <div class="card-text">
            <small class="text-muted">{{ item.author }}</small>
          </div>
        </div>
      </div>
      <h1 v-if="$store.state.posts.error">{{$store.state.posts.error}}</h1>
    </div>
  </div>
   <div class="container mx-3" v-if="filtered.length == 0 && !$store.state.posts.loading">
     <h2>no results</h2>
   </div>
</template>


<script>

export default {
  created() {
    this.$store.dispatch('posts/getPosts')
  },
  methods: {
  },
  computed: {
    filtered() {
      return this.$store.state.posts.postsRender.filter(item => item.author.toLowerCase().indexOf(this.$store.state.posts.search.toLowerCase()) !== -1)
    }
  }
}

</script>