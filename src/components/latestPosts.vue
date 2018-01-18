<template>
  <div class="container-fluid" id="postList">
    <h5 class="list-title">Latest Posts</h5>
    <ul>
      <li  v-for="post in orderedPosts" :key="post._id">
        <div class="card card-body">
          <h6 class="title flex-item"><strong>{{ post.title }}</strong></h6>
          <img class="" :src="post.image">
          <router-link v-bind:to="'/thread/'+ post.threadID"><span class="link-span" @click="view(post.threadID, post.threadName)">open</span></router-link>
        </div>
        <div class="card-footer">
          <p class="thread-footer">thread: <span class="enhance">{{ post.threadName }}</span></p>
          <p class="thread-footer">created by: <strong class="postedByText">{{ post.postedBy }}</strong>   on: <strong>{{ post.postedOn | moment }}</strong></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    import moment from 'moment'
    export default {
      name: 'latestPosts',
      data() {
        return {
          posts: {}
        }
      },
      methods: {
        view(id,threadname) {
          this.$store.commit('setThreadId', id );
          this.$store.commit('setThreadName', threadname );
        }
      },
      filters: {
        moment: date => {
          return moment(date).format('MMMM Do YYYY, h:mm a');
        },
        toUpperCase: title => {
          return title.toUpperCase();
        }
      },
      computed: {
        orderedPosts: function() {
          let posts = this.$store.getters.getPosts;
          return this.$lodash.orderBy(posts,['postedOn'], ['desc']);
        }
      },
      sockets: {

      }
    }
</script>

<style scoped>
ul {
  margin:0;
  padding:0;
  overflow-y:scroll;
  height:120vh;

}

li {
  list-style: none;
  margin-bottom:8px;
  margin-right:10px;
  padding:5px;
}

.title {
  color:black;
  padding:5px;
}

#title {
  padding:5px;
  color:lightgreen;
  text-align:left;
  font-size: 1rem;
}

.enhance {
  color: rgb(197, 45, 45);
  font-size:0.9rem;
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
}

.view-btn {
  padding:5px;
  font-size:12px;
}

.thread-footer {
  font-size:0.9rem;
}
</style>
