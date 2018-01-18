<template>
  <div class="container-fluid">
    <h5 class="list-title">Threads</h5>
    <ul>
      <transition-group tag='li' name='slide-up'>
        <li v-for="thread in orderedThreads" :key="thread._id">
          <div class="card card-body">
            <h6 class="title flex-item"><strong>{{ thread.title }}</strong></h6>
            <router-link v-bind:to="'/thread/'+ thread._id"><span class="link-span" @click="view(thread._id, thread.title)">view</span></router-link>  <!-- + thread._id   -->
          </div>
          <div class="card card-footer">
            <p class="single-thread-footer">created by: <strong class="postByText">{{ thread.creatorName }}</strong>   on: <strong>{{ thread.createdOn | moment }}</strong></p>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        threads: [],
      }
    },
    computed: {
      orderedThreads() {
        return this.$lodash.orderBy(this.$store.getters.getThreads, ['createdOn'], ['desc']);
      }

    },
    methods: {
      view(id, title) {
        this.$store.commit('setThreadId', id);
        this.$store.commit('setThreadName', title);
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
    created() { /*  duplicate code in mounted event!!
      this.$http.get("http://localhost:5000/latestThreads").then(response => {
        this.$store.dispatch('setThreads', response.data);
        this.threads = this.$store.getters.getThreads;
      }).catch(err => {
        console.log('Error retrieving threads');
      }); */
    },
    mounted() {
      if(this.$store.getThreads) {
        this.threads = this.$store.getters.getThreads;
      } else {
        this.$http.get("http://localhost:5000/latestThreads").then(response => {
        this.$store.dispatch('setThreads', response.data);
        this.threads = this.$store.getters.getThreads;
        }).then(posts => {
          this.$http.get("http://localhost:5000/latestPosts").then(response => {
          this.$store.dispatch('setPosts', response.data);
          }).catch(err => {
            console.log('Error retrieving data');
          });
        })
      }
    }



  }


</script>

<style scoped>
.header-section {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 35px;
  font-size:0.8rem;
  padding:5px;

}

ul {
  margin:0;
  padding:0;
  overflow-y:scroll;
  height:120vh;
}

.card-footer {
  display:flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  font-style: italic;
  margin:0;
}

span {
  color: green;
  margin-right:10px;
}

strong {
  font-size:0.9rem;
}

.single-thread-footer {
  font-size:0.8rem;
}

.view-btn {
  display:inline-block;
  width:40px;
  height:30px;
  padding:4px;
  cursor:pointer;
}

.slide-up-enter-active, .fade-leave-active {
  transition: opacity 1.5s
}
.slide-up-enter, .fade-leave-to {
  opacity: 0
}

</style>


