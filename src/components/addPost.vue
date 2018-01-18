<template lang="html">
  <div class="container">
    <form id="addPost_form" class="form-horizontal">
      <textarea placeholder="app post" v-model="postText"></textarea>
      <button type="submit" class="btn btn-success" @click.prevent="addPost">Submit</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'addPost',
  data() {
    return {
      postText: ''
    }
  },
  methods: {
    addPost() {
      console.log('adding post');
      if(!sessionStorage.getItem('accessToken')) { return; }
      this.post('http:localhost:5000/newPost', { id: threadId, token: sessionStorage.getItem('accessToken'), text: this.postText}).then(response => {

      }).catch(err => {
        console.log('could not add post')
      })
    }
  }

}
</script>

<style lang="css">


</style>
