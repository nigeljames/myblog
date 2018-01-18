<template>
<div class="container-fluid">
  <nav class="navbar navbar-expand-lg">
  <div class="flex-item">
    <a class="navbar-brand" href="#"><span style="font-size:1.0rem; color:orange; font-style:italic">the</span><span style="font-size:1.8rem; color:red;">Right</span><span style="font-size:1.8rem; color:green;">Voice</span></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
  <div class="collapse navbar-collapse flex-item" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/latestThreads" class="nav-link"><i class="fa fa-home" aria-hidden="true"></i> Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/latestPosts" class="nav-link"><i class="fa fa-calendar" aria-hidden="true"></i> Latest Posts</router-link>
      </li>
      <li class="nav-item" v-if='this.$store.getters.getLoggedStatus'>
        <router-link to="/myPosts" class="nav-link"><i class="fa fa-envelope-square" aria-hidden="true"></i> My Posts</router-link>
      </li>
      <li class="nav-item" v-if='this.$store.getters.getLoggedStatus'>
        <router-link to="/myThreads" class="nav-link"><i class="fa fa-folder-open" aria-hidden="true"></i> My Threads</router-link>
      </li>
    </ul>
    <form class="form-inline navbar-right searchForm flex-item" @click.prevent="search">
      <select class="form-control" id="searchOptions" v-model="searchType">
        <option value="threads">search threads</option>
        <option value="posts">search posts</option>
        <option value="member">search members</option>
      </select>
      <input class="form-control mr-sm-2" type="text" aria-label="Search"  id="searchBox" v-model="searchText">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
    <ul class="nav navbar-nav navbar-right">
      <!-- Login & registration controls -->
      <li v-if="!this.$store.getters.getLoggedStatus" style="width:140px;"><a href="#Modal" data-toggle="modal"><i class="fa fa-sign-in" aria-hidden="true"></i> Sign In/Register</a></li>
      <li v-else style="width:140px;"><i class="fa fa-sign-out" aria-hidden="true"></i><a href="#" @click.prevent="logOut"> Sign Out</a></li>
    </ul>
  </nav>

  <!-- Login/register modal -->
  <div id="Modal" class="modal fade" ref="modalForm">
    <div class="modal-content modal-dialog">
      <div class="modal-header text-center">
          <h4 class="modal-title" id="myModalLabel"><span style="font-size:1.0rem; color:orange; font-style:italic">the</span><span style="font-size:1.8rem; color:red;">Right</span><span style="font-size:1.8rem; color:green;">Voice</span></h4>
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-6" id="loginDiv">
            <div class="well">
              <form id="loginForm" class="text-center">
                  <div class="form-group">
                    <p class="lead"><span class="text-success">Log In</span></p>
                    <label for="username" class="control-label">Username</label>
                    <input type="text" class="form-control" id="username" name="username" title="Please enter you username" v-model="username" required autofocus autocomplete="off" >
                  </div>
                  <div class="form-group">
                    <label for="password" class="control-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required="Password required" autocomplete="off" v-model="password" title="Please enter your password">
                  </div>
                  <button type="submit" class="btn btn-success btn-block" @click.prevent="login">Login</button>
                  <div style="margin-top:10px;"><p>{{ msg }}</p></div>
              </form>
            </div>
          </div>
          <div class="col-md-6" id="registrationDiv">
              <p class="lead">Register now for <span class="text-success">FREE</span></p>
              <ul class="list-unstyled" style="line-height: 2">
                <li><span class="fa fa-check text-success"></span> Start new blogs</li>
                <li><span class="fa fa-check text-success"></span> Add new posts</li>
                <li><span class="fa fa-check text-success"></span> View all your blogs and posts</li>
                <li><span class="fa fa-check text-success"></span> Contact other members</li>
              </ul>
              <hr>
              <form class="form-group registration-form">
                <input type="text" placeholder="user name" name="username" v-model="new_username">
                <input type="text" placeholder="email" name="email" v-model="email">
                <input type="password" placeholder="password (min 6 characters)" name="password" v-model="new_password" min="6" ref="passwordfield">
                <input type="password" placeholder="confirm password" name="confirmPassword" v-model="confirmPassword">
                <p><a href="*" class="btn btn-info btn-block" id="btn-register" @click="register">Register now!</a></p>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div> <!-- End of Login/registration model -->
</div>
</template>

<script>

export default {
  name: 'nav',
  data () {
    return {
      username: '',
      password: '',
      new_username: '',
      new_password: '',
      confirmPassword: '',
      email: '',
      msg: '',
      alert: false,
      searchType: 'threads',
      searchText: ''
    }
  },
  computed: {

  },
  methods: {
    register(e) {
      e.preventDefault();
      this.alert = false;
      this.msg = '';
      if(!this.new_password || !this.new_username || !this.email) {
        this.msg ="No username, password or email provided";
        this.alert = true;
        return;
      }
      if(this.new_password != this.confirmPassword) {
        this.msg = "Passwords do not match";
        this.alert = true;
        this.password = '';
        this.confirmPassword = '';
        this.$refs.passwordfield.focus();
        return;
      }

      $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/register',
        data: {
          username: this.new_username,
          password: this.new_password,
          email: this.email
        },
        success:
          function(data) {
            if(data) {
              if(data === 'Username not available') {
                this.msg = 'Username already in use';
                this.alert = true;
                console.log('Duplicate username data: '+data);
                return;
              }
              if(data === 'Email already registered. Already have an acccount?') {
                this.msg = 'Email already registered. Already have an account?';
                console.log(this.msg);
                this.alert = true;
                return;
              }
              if(data) {
                console.log('registered');
                $('#Modal').modal('hide');
              }
            }

        },
        error:
          function(err) {
            console.log(err);
            this.msg = 'No Server Response. Please try again later';
        }

      })
    },
    // LOGIN
    login(e) {
      if(this.username === '' || this.password === '') {
        return;
      }
      this.$http.post('http://localhost:5000/login', { username: this.username, password: this.password }).then(function(response) {
        if(!response) {
          this.msg = 'Login details not found';
          this.$store.commit('setUserNone');
          console.log('No Data');
        }
        else {
          const user = {
            username: response.body.username,
            email: response.body.email,
            userId: response.body.userId
          }
          localStorage.setItem('therightvoice_user', user);
          sessionStorage.setItem("accessToken", response.body.token);
          this.$store.commit('setUser', response.body);
          this.$socket.emit('signedIn', user.username);
          $('#Modal').modal('hide');
        }
      }).catch(function(err) {
        console.log(err)
      })
    },
    logOut() {
      sessionStorage.removeItem("accessToken");
      this.$socket.emit('signedOut', this.$store.getters.getUsername);
      this.$store.commit('setUserNone');
      this.$router.push('/latestThreads');
    },
    search() {
      if(this.searchText) {
        // set and commit search text and type
        this.$store.commit('setSearchText', this.searchText);
        this.$store.commit('setSearchType', this.searchType);
        // commit function to create search list
        this.$store.commit('setFilteredData', { text: this.searchText, type: this.searchType });
        // Route to search results page
        this.$router.push('/filtered');
      }
    }
  },
  sockets: {
      joined(user) {
        console.log('Client logged in event fired with: '+user);
        if(user){
          this.$store.commit('SOCKET_SET_MEMBER_ACTIVE', user);
          console.log('user joined');
        }
      },
      left(user) {
        console.log('Client logged out event fired');
        if(user) {
          this.$store.commit('SOCKET_SET_MEMBER_NOT_ACTIVE', user);
          console.log('user left');
        }
      }
  }
}

</script>


<style scoped>
.navbar {
  margin:0;
  width:100%;
  background-color: transparent;
  display:flex;
  margin-bottom: 30px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.modal-dialog {
  margin:auto auto;
  border-radius:15px !important;
  background-color: lightblue;
}

#modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-header, .modal-body {
  background-color: lightblue;
  color: black;
}

.modal-title {
  margin:auto;
}
.form-group > input {
  width:80%;
  border-radius:5px;
  margin: auto;
  margin-bottom:5px;
  padding:5px;

}
#registrationDiv loginDiv {
  background-color:#F5F5F5;
  width:47%;
  margin:5px;
}
#searchTerm {
  margin:0;
}

.fa fa-users .fa fa-user-circle {
  background-color:red;
}

.searchForm {
  margin-right:50px;
}

.navbar-brand {
  font-size:2rem;
  color: red;
  text-shadow: 2px 2px navy;
}
#btn-register {
  color: navy;
  font-weight: bold;
  margin-top:10px;
}

#searchOptions, #searchBox {
  margin-right:10px;
  background-color: white;
  color: green;
}

#selectText {
  font-style: italic;
  color:grey;
  font-size:1rem;
}
</style>
