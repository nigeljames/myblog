<template>
  <div style="margin-bottom:20px;">
    <form class='form-group' id="newThreadForm" >
        <div class="col-md-12">
            <p class="text-center newThreadHeader">Create New Thread:</p>
            <input type="text" placeholder="New Thread Title" class="form-control flex-item" id="newTitle" v-model="newTitle" required>
            <textarea type="textarea" rows="3" placeholder="First Post (optional)" class="form-control flex-item" id="firstPost" v-model="firstPost"></textarea>
            <button type="submit" id="newThreadSubmit" class="flex-item btn btn-primary" @click.prevent="submit">Submit</button>
        </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'newThread',
    data() {
      return {
        newTitle: '',
        firstPost: ''
      }
    },
    methods: {
      submit(e) {
        if(this.newTitle) {
          const id = this.$store.getters.getUserId;
          const name = this.$store.getters.getUsername;
          this.$http.post('http://localhost:5000/newThread', { title: this.newTitle, Id: id, Name: name, post: this.firstPost })
            .then(function(data) {
                if(data) {
                  this.$store.dispatch('setThreads', data);
                  this.newTitle = '';
                  this.$router.push('/latestThreads');
                }
            })
            .catch(function(err) {
              console.log(err)
            })
        }
      }
    }
  }
</script>

<style scoped>
  #newThreadForm {
    margin:auto auto;
    border: 2px solid navy;
    background-color:lightblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:60%;
    padding:10px;
    font-size:1rem;
    border-radius: 8px;
  }

  .newThreadHeader {
    color:green;
    font-size:1rem;
  }

  #newTitle {
    width:80%;
    font-size:0.9rem;
    padding:10px;
    height:40px;
    margin:auto;
    margin-bottom:10px;
  }

  #newThreadSubmit {
    font-size:1rem;
    color:white;
    background-color:green;
    display: block;
    margin:auto;
    margin-top:10px;
  }

  #newThreadSubmit:hover {
    cursor: pointer;
    color:blue;
    background-color:red;
  }



</style>
