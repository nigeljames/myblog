<template>
    <div id="members-list">
      <contact v-if="contacting"></contact>
      <h6 class="text-center" id="membersHeading">All Members</h6>
      <p style="font-weight:normal; font-style: italic; margin-bottom:20px;" class="text-center" id="subHeading">(active members in bold)</p>
      <p style="font-weight:normal; font-style: italic; margin-bottom:20px;" class="text-center" id="subHeading">(click to message)</p>
      <ul>
        <li v-for="member in orderedMembers" :key="member.username"><p class="memberName text-center" @click="contactMember(member._id, member.active)" :class="{setBold: member.active === true}">
          {{ member.username }}</p></li>
      </ul>


    </div>
</template>

<script>
  import contact from '../components/contact.vue'
  export default {
      name: 'members',
      data() {
        return {
          contacting: false
        }
      },
      methods: {
        contactMember(id, status) {
          // Called when member is selected
          if(!this.$store.getters.getLoggedStatus) {
            this.contacting = false;
            alert('Please log in/register to contact members');
          } else {
            if(status === false) {
              this.contacting = false;
              alert('Member must be logged in to receive messages');
            }else {
              this.contacting = true;



            }
          }
        },
      },
      computed: {
        orderedMembers() {
          return this.$lodash.orderBy(this.$store.getters.getAllMembers, ['username']);
        }
      },
      created() {
        /*this.$http.get("http://localhost:5000/allMembers").then(response => {
              if(response) {
                this.$store.dispatch('setAllMembers', response.data);
              } else {
                console.log('No Current Active Members');
              }
          }).catch(err => {
              console.log(err);
              console.log('could not retrieve members')
          }) */
      },
      mounted() {
          this.$http.get("http://localhost:5000/allMembers").then(response => {
              if(response) {
                  this.$store.dispatch('setAllMembers', response.data);
              } else {
                  console.log('could not retrieve members');
              }
          }).catch(err => {
              console.log('Error: '+ err + ' Could not retrieve members')
          })
      },
      components: {
        contact
      }
  }
</script>

<style scoped>
  #membersHeading {
    color:green;
    margin-top:20px;
  }

  #subHeading {
    color: rgb(23, 134, 23);
  }

  #members-list {
      margin:20px;
      background-color: lightblue;
      border:3px ridge navy;
      border-radius: 6px;
      overflow: auto;
      height: 100%;
  }

  .memberName {
      margin-bottom:20px;
      font-style: italic;
      margin: auto auto;
      font-weight:lighter;
      font-size:1rem;
      cursor: pointer;
      color: navy;
  }

  .memberName:hover {
      color: red;
  }

  ul {
      margin:0;
      padding:0;
  }

  li {
      list-style: none;
  }

  .setBold {
    font-weight:bolder;
    color:green;
  }
</style>
