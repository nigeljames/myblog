<template>
<div>
    <div v-if="filteredData">
        <ul v-if="$store.getters.getSearchType === 'threads'">
          <h6 class="list-title">Threads found for {{ $store.getters.getSearchText }}</h6>
          <transition-group tag='li' name='slide-up'>
              <li v-for="item in filteredData" :key="item._id">
                  <div class="card card-body">
                      <h6 class="title flex-item"><strong>{{ item.title }}</strong></h6>
                      <router-link v-bind:to="'/thread/'+ item._id"><span class="link-span" @click="view(item._id, item.title)">view</span></router-link>
                  </div>
                  <div class="card card-footer">
                      <p class="single-thread-footer">created by: <strong class="postByText">{{ item.creatorName | toUpperCase }}</strong>   on: <strong>{{ item.createdOn | moment }}</strong></p>
                  </div>
              </li>
          </transition-group>
        </ul>
        <ul v-if="$store.getters.getSearchType === 'posts'">
          <h6 class="list-title">Posts found for {{ $store.getters.getSearchText }}</h6>
          <transition-group tag='li' name='slide-up'>
              <li v-for="item in filteredData" :key="item._id">
                  <div class="card card-body">
                      <h6 class="title flex-item"><strong>{{ item.title }}</strong></h6>
                      <router-link v-bind:to="'/thread/'+ item.threadID"><span class="link-span" @click="view(item.threadID, item.threadName)">view</span></router-link>
                  </div>
                  <div class="card card-footer">
                      <p class="single-thread-footer">created by: <strong class="postByText">{{ item.postedBy | toUpperCase }}</strong>   on: <strong>{{ item.postedOn | moment }}</strong></p>
                  </div>
              </li>
          </transition-group>
        </ul>
        <ul v-if="$store.getters.getSearchType === 'member'">
            <!-- Get list posts by selected member -->
            <h6 class="list-title">Posts found for {{ $store.getters.getSearchText }}</h6>
            <transition-group tag='li' name='slide-up'>
                <li v-for="item in membersPosts" :key="item._id">
                    <div class="card card-body">
                        <h6 class="title flex-item"><strong>{{ item.title }}</strong></h6>
                        <router-link v-bind:to="'/thread/'+ item.threadID"><span class="link-span" @click="view(item.threadID, item.threadName)">view</span></router-link>
                    </div>
                    <div class="card-footer">
                      <p class="thread-footer">thread: <span class="enhance">{{ item.threadName }}</span></p>
                    </div>
                </li>
            </transition-group>
        </ul>
    </div>
    <div v-else>
        <h3>No search results found..</h3>
    </div>
</div>
</template>

<script>
    import moment from 'moment'
    export default({
        name: 'filtered',
        methods: {
            view(id, title) {
                this.$store.commit('setThreadId', id);
                this.$store.commit('setThreadName', title);
            },
        },
        computed: {
            filteredData() {
              return this.$store.getters.getFilteredData;
            },
            membersPosts() {
              return this.$store.getters.getFilteredData;
            }
        },
        filters: {
            moment: date => {
                return moment(date).format('MMMM Do YYYY, h:mm a');
            },
            toUpperCase: title => {
                return title.toUpperCase();
            }
        }


    })
</script>

<style scoped>

h6 {
    text-align:left;
    margin-left: 0;
    color: green;
    margin-bottom:20px;
}

.card-footer {
  display:flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  font-style: italic;
  margin:0;
}

.slide-up-enter-active, .fade-leave-active {
  transition: opacity 1.5s
}
.slide-up-enter, .fade-leave-to {
  opacity: 0
}

.list-title {
  color: lightgreen;
  text-align: left;
  font-size:0.9rem;
  margin-bottom:10px;
  margin-left:10px;
}

</style>
