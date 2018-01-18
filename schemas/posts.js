let mongoose = require('mongoose');
let schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


let postSchema = new schema({
    title: {
      type: String,
      required: true
    },
    postedOn: {
      type: Date,
      required: true,
      default: Date.now()
    },
    postedBy: {
      type: String,
      required: true
    },
    posterId: {
      type: String,
      required: true
    },
    threadID: {
      type: String,
      required: true
    },
    threadName: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
    imageUrl: {
      type: String
    }

});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
