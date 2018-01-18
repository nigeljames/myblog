let express = require('express');
let path = require('path');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let mongoose = require('mongoose');
let multer = require('multer');
let PORT = process.env.port | 5000;
let passport = require('passport');
let passportLocal = require('passport-local');
let bodyParser = require('body-parser');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let expressSession = require('express-session');
let bcrypt = require('bcrypt');
let salt = bcrypt.genSaltSync(10);
let Routes = require('./src/Routes/routes');
let User = require('./schemas/users');
let { Thread } = require('./schemas/threads.js');
let { Post } = require('./schemas/posts.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'dy2fbi39821ne02',
    saveUninitialized: false,
    resave: false
}));

// passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal.Strategy(function(username, password, done) {
    User.findOne({ 'username': username }, function(err, user) {
        if (err) return new Error();
        if (!user) {
            done(null, false)
        } else {
            if (user.password === bcrypt.hashSync(password, salt)) {
                done(null, user)
            } else {
                done(null, { msg: 'Invalid Password' })
            }
        }
    })
}));

passport.serializeUser(function(user, done) {
    done(null, user)
});
passport.deserializeUser(function(id, done) {
    Users.findOne({ 'username': username }, function(err, user) {
        done(err, user)
    })
});

mongoose.connect('mongodb://localhost:27017/myBlogs', function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Database Connected")
    }
});

app.use(Routes);

io.on('connection', function() {
    console.log('client connected')
})

http.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`)
});;