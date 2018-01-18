<template>
<div class="container-fluid">
    <div class="row" v-if="this.$store.getters.getLoggedStatus">
      <div class="col-md-12">
        <newThread></newThread>
      </div>
    </div>
  <!--<div class="row">
    <div class="col-md-12">
      <h5 class="title" id="title">My Threads</h5>
    </div>
  </div> -->
  <div class="row">
    <div class="col-md-12">
      <h5 class="title" id="title">My Threads</h5>
      <ul>
        <li v-for="thread in threads" :key="thread._id">
          <div class="card card-body">
            <h6 class="title flex-item"><strong>{{ thread.title }}</strong></h6>
            <router-link v-bind:to="'/thread/'+ thread._id"><span class="link-span" @click="view(thread._id, thread.title)">view</span></router-link>
          </div>
          <div class="card card-footer">
            <p class="thread-footer">created on: <strong class="postedByText">{{ thread.createdOn | moment }}</strong></p>
          </div>

        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import newThread from './newThread.vue'
import moment from 'moment'

export default {
  name: 'myThreads',
  data() {
    return {
      threads: {},
      id: '' //this.$router.params.userId;
    }
  },
  beforeMount() {
    if(!this.$store.getters.getLoggedStatus || !sessionStorage.getItem('accessToken')) {
      this.$router.push('/latestThreads');
    }
  },
  mounted() {
    this.id = this.$store.getters.getUserId;
    if(!this.id) {
      this.msg = 'Please log in to view your threads';
      this.$router.push('/latestThreads');
    } else {
      this.$http.get('http://localhost:5000/myThreads/' + this.id).then(response => {
        this.threads = response.body;
        this.$store.dispatch('setMyThreads', this.threads);
      }).catch(err => {
        this.msg = 'Error retreiving your threads'
      })
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
  components: {
    newThread
  },
  methods: {
    view(id, title) {
      this.$store.commit('setThreadId', id );
      this.$store.commit('setThreadName', title );
    }
  }
}
</script>

<style scoped>
#listHeader {
  text-align: left;
  font-size:0.9rem;
  color:lightgreen;
  margin-bottom:15px;
}

.view-btn {
  padding:5px;
}

.title {
  padding:5px;
}

.thread-footer, .card-footer {
  display:flex;
  justify-content: flex-end;
}



</style>
