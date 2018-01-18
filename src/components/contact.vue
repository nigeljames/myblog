<template>
  <div class="container-fluid text-center" id="messageBox" v-if="messenging">
    <input type="text" id="messageText" placeholder="type message.." autofocus v-model="message">
    <button type="submit" class="btn btn-success" id="submit_message" @click.prevent="submitMessage">Send</button>
  </div>
</template>

<script>
  export default {
    name: 'contact',
    //props: [ membername, member],
    data() {
      return {
        placeholder: "type message to ",  // + recipient,
        messenging: true,
        message: ''
      }
    },
    methods: {
      submitMessage() {
        if(message) {

        }
      }
    }

  }
</script>

<style scoped>

#messageBox {
  margin:auto;
  width:95%;
  border:2px solid green;
  padding:2px;
  display: flex;
  justify-content: center;
  margin-top:5px;
}

#messageText {
  width:100%;
  padding:2px;
  margin-right:2px;

}
</style>
