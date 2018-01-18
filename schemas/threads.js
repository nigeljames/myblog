let mongoose = require('mongoose');
let schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');


let threadSchema = new schema({
    title: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    creatorId: {
        type: String,
        required: true
    },
    creatorName: {
        type: String,
        required: true
    }

});

const Threads = mongoose.model('Threads', threadSchema);
module.exports = Threads;

//exports = mongoose.model('Threads', threadSchema);