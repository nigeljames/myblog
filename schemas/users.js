const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');

let userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }

    },
    joinDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    active: {
        type: Boolean,
        default: false,
        required: true
    }

});

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;