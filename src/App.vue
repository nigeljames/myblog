<template>
  <div class="container-fluid" id="app">
    <navbar></navbar>
    <p v-if="$store.getters.getUsername" style="text-align: right; margin-right:20px; color:orange;">Welcome back {{ $store.getters.getUsername }}</p>
    <div class="container-fluid">
    <h5 id="errorMsg">{{ $store.getters.getMsg }}</h5>
      <div class="row">
        <div class="col-sm-12 col-md-9">
          <router-view></router-view>
        </div>
        <div class="col-sm-12 col-md-3">
          <members></members>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import navbar from './components/navbar.vue'
import latestPosts from './components/latestPosts.vue'
import latestThreads from './components/latestThreads.vue'
import myPosts from './components/myPosts.vue'
import myThreads from './components/myThreads.vue'
import members from './components/members.vue'
import thread from './components/thread.vue'
import addPost from './components/addPost.vue'
import filtered from './components/filtered.vue'

export default {
  name: 'app',
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    navbar, latestPosts, latestThreads, myPosts, myThreads, members, thread, addPost, filtered
  },
  mounted() {
    window.addEventListener('onunload', this.befourDestroy);
  },
  beforeDestroy() {
    sessionStorage.removeItem("accessToken");
    if(this.$store.getters.getUsername) {
      this.$http.post('http://localhost:5000/logout', { username: this.$store.getters.getUsername }).then(response => {
      this.$store.commit('setUserNone');
      this.$store.commit('setLoggedStatus', false);
    }).catch(err => {
      console.log(err)
    });
    }
  }

}
</script>

<style scoped>

  #errorMsg {
    color:red;
    font-weight:bold;
    text-align:center;
  }
</style>



// Global styles
<style>
body{
  background-color: black;
  color: white;
}

.title {
  color:black;
  padding:5px;
  font-size:0.9rem;
}

ul {
  margin: 0;
  padding:0;
}

li {
  list-style: none;
  padding:5px;
  font-size:1rem;
}

.card-body  {
  background-color: lightblue;
  color:black;
  height:auto;
  min-height:40px;
  padding:5px;
  display:flex;
  flex-direction:row;
  flex-flow: nowrap;
  justify-content:space-between;
  text-align:left;

}

.card-footer {
  height:25px;
  color:black;
  display:flex;
  flex-direction:row;
  flex-flow: nowrap;
  justify-content: space-between;
  background-color:deepskyblue;
  padding: 5px;
  font-size:0.9rem;
  margin-bottom:5px;
  text-align:right;
}

.post-footer {
  display:flex;
  height:25px;
  flex-direction:row;
  flex-flow: nowrap;
  justify-content: space-between;
}

.postedByText {
  margin-right:10px;
  margin-left:5px;
}

.list-title {
  color: lightgreen;
  text-align: left;
  font-size:0.9rem;
  margin-bottom:10px;
  margin-left:10px;
}

.link-span {
  color:green;
  align-items: center;
  font-size:0.9rem;
}

.enhance {
  color: red;
  font-weight: bold;
}

</style>

