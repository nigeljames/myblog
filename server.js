let express = require('express');
let path = require('path');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let mongoose = require('mongoose');
let PORT = process.env.port | 5000;
let bodyParser = require('body-parser');
let cors = require('cors');
let Routes = require('./src/Routes/routes');
let User = require('./schemas/users');

const { SHA256 } = require('crypto-js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myBlogs', function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Database Connected")
    }
});

app.use(Routes);

io.on('connection', function(socket) {
    // Tell clients someone signed in
    socket.on('signedIn', (data) => {
        User.findOneAndUpdate({ username: data }, { $set: { active: true } }, function(err, res) {
            if (res) {
                socket.broadcast.emit('joined', data);
            }
        });
    });
    // Tell clients someone signed out
    socket.on('signedOut', (data) => {
        User.findOneAndUpdate({ username: data }, { $set: { active: false } }, function(err, res) {
            if (res) {
                socket.broadcast.emit('left', data);
            }
        })
    });
})
io.on('disconnnnected', function() {
    User.findOneAndUpdate({ username: data }, { $set: { active: false } }, function(err, res) {
        if (res) {
            socket.emit('left', data);
        }
    })
})

http.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`)
});