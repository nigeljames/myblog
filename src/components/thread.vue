<template>
  <div class="container-fluid">
    <section id="newPost" v-if="this.$store.getters.getLoggedStatus">
      <div class="col-md-12">
        <form id="addPost_form" class="form-group" enctype="multipart/form-data" @submit.prevent="addPost">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <textarea id="noteText" class="form-control flex-item" placeholder="add post" autofocus rows="4" v-model="postText"></textarea>
              </div>
            </div>
          </div>
          <div class="container" id="uploader">
            <div class="row">
              <div class="col-md-12">
                <div class="col-md-12">
                  <h6 id="uploadText" style="display:inline-block;">Upload Image: </h6>
                  <input type="file" name="postImage" accept="image/*" class="form-control" id="imageUploader" ref="imageUpload"/>
                  <button type="submit" class="btn btn-primary form-control flex-item" id="submit-btn" style="display:block;">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>

    <section id="body-section">
      <div class="row">
        <div class="col-md-12">
          <h6 class="list-title" id="title">{{ this.$store.getters.getThreadName }}</h6>
          <ul>
            <li v-for="post in orderedPosts" :key="post._id">
              <div class="card card-body">
                <h6 class="title flex-item" style="padding:5px; height:auto; min-height:35px; overflox-x:auto"><strong>{{ post.title }}</strong></h6>
                <img :src='post.image' class=".img-fluid">
              </div>
              <div class="card card-footer">
                <p><i class="fa fa-thumbs-o-up" @click="voteUp(post._id), post.likes += 1" aria-hidden="true"> {{ post.likes }}</i> <i class="fa fa-thumbs-o-down" @click="voteDown(post._id), post.dislikes += 1" aria-hidden="true"> {{ post.dislikes }}</i></p>
                <p class="post-footer">posted by: <strong class="postedByText">{{ post.postedBy | toUpperCase }}</strong>on: <strong>{{ post.postedOn | moment }}</strong></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
var _ = require('lodash/core');

export default {
  name: 'thread',
  data() {
    return {
      posts: {},
      postText: '',
      loggedInUser: false,
      id: this.$store.getters.getThreadId,
    }
  },
  mounted() {
    if(sessionStorage.getItem('accessToken')) { this.loggedInUser = true; }
    this.$http.get("http://localhost:5000/threadPosts/"+ this.$store.getters.getThreadId).then(response => {
      this.posts = response.body;
      this.$store.dispatch('setThreadPosts', response.body);
      this.postText = '';
    }).catch(err => {
      console.log('Error retrieving posts');
    })
  },
  methods: {
    addPost(e) {
      if(!sessionStorage.getItem('accessToken')) {
        console.log('Please log in');
        return;
      }
      let postImage = this.$refs.imageUpload.files[0];
      //console.log('postImage: '+ postImage);

      if(this.postText === '' && !postImage) {
        return;
      }
      if(this.postText == '') {
        this.$store.commit('setMsg','Post missing or too short.');
        return;
      }
      if(!this.$store.getters.getuser) {
        return;
      }
      else {
        this.$store.commit('setMsg','');
        var formData = new FormData();
        // Set up form data
        formData.append('postedBy', this.$store.getters.getUsername);
        /*console.log('username: '+this.$store.getters.getUsername);
        console.log('userId: '+this.$store.getters.getUserId);
        console.log('postText: '+this.postText);
        console.log('threadId: '+this.$store.getters.getThreadId);
        console.log('threadName: '+this.$store.getters.getThreadName); */
        formData.append('posterId', this.$store.getters.getUserId);
        formData.append('postText', this.postText);
        formData.append('threadId', this.$store.getters.getThreadId);
        formData.append('threadName', this.$store.getters.getThreadName);
        if(postImage) {
          formData.append('image', postImage)
        } else {
          formData.append('image', {})
        }
        formData.append('token', sessionStorage.getItem('accessToken'));
        $.ajax({
          url: 'http://localhost:5000/newPost/',
          type: 'POST',
          data: formData,
          contentType: false,
          cache: false,
          enctype: 'multipart/form-data',
          processData: false,
          success: function(response) {
            this.posts.push(response.body);
          },
          error: function(err){
            console.log(err)
          }
        });
      }
    },
    voteUp(id) {
      this.$http.post('http://localhost:5000/upvote/', { id }).then(res => {

      }).catch(err => {

      })
    },
    voteDown(id) {
      this.$http.post('http://localhost:5000/downvote/', { id }).then(res => {

      }).catch(err => {

      })
    },
    sockets: {

    }
  },
  computed: {
    orderedPosts: function() {
      return this.$lodash.orderBy(this.$store.getters.getThreadPosts,['postedOn'], ['desc']);
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

  }
}
</script>

<style scoped>
#threadName {
  color:lightgreen;
  text-align: left;
  font-size:0.9rem;
}

.threadHeader {
  display: flex;
  justify-content: space-between;
}

.title {
  padding:5px;
}

ul {
  margin:0;
  padding:0;
  overflow-y:scroll;
  height:120vh;
}

li {
  list-style: none;
  margin-bottom:10px;
  margin-right:10px;
  border-bottom: 2px solid navy;
}

.btn-addPost {
  font-size:0.8rem;
  width:70px;
  height:30px;
  padding:5px;
  align-items: stretch;
}

strong {
  font-weight:bold;
}

#addPost_form {
  width:70%;
  height:140px;
  display:flex;
  justify-content: center;
  background-color:lightblue;
  margin:auto;
  padding:10px 20px;
  border-radius:5px;
  border:2px solid darkblue;

}

#noteText {
  overflow-y: auto;
  height:120px;
  width:100%;
}

#newPost {
  display:flex;
  justify-content:center;
  width:100%;
  align-content: center;
  margin-bottom:40px;
}

.card-footer {
  display:flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-style: italic;
  margin:0;
}

.fa {
  margin:0 8px;
}

.fa-thumbs-o-down {
  color:red;
}

#uploader {
  display:flex;
}

#uploadText {
  padding:0;
  margin: 10px 10px 10px 0;
  font-weight:bold;
  text-align:left;
}

#imageUploader {
  display:inline;
  padding-left:4px;
  padding-bottom:5px;
  padding-top:5px;
}

#submit-btn {
  width:50%;
  height:35px;
  margin:auto;
  margin-top:10px;
  background-color: green;
  color:white;
  font-family:sans-serif,cursive;
  border:none;
}

#submit-btn:hover {
  cursor:pointer;
  color:red;
  font-family:sans-serif;
}


</style>

<!-- <div class="col-md-3">
  <vue-clip :options="options" class="uploader">
    <template slot="clip-uploader-action">
      <div class="uploader-action">
        <div class="dz-message">
          <h6>Drag & Drop image file here or click to browse</h6>
        </div>
      </div>
    </template>
    <template slot="clip-uploader-body" scope="props">
      <div class="uploader-files">
        <div class="uploader-file">
          <div class="file-avatar">
            <img v-bind:src="props.files.dataUrl" v-model="imageFile">
          </div>
        </div>
      </div>
      <div class="file-progress" v-if="props.files.status !== 'error' && props.files.status !== 'success'">
        <span class="progress-indicator" v-bind:style="{width: props.files.progress + '%'}"></span>
      </div>
    </template>
  </vue-clip>

</div> -->



<!--options: {
  url: 'http://localhost:5000/newPost/',
  paramName: 'file',
  uploadMultiple: false,
  acceptedFiles: {
    extensions: ['image/*'],
    message: 'Image files only!'
  },
  maxFiles: 1
} -->
