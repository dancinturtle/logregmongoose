const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: {
        type: String, 
        required: [true, "An email is required!"], 
        unique: true,
        validate: {
            validator: function(value){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: "Email failed validation. You must provide a valid email."
        }
    },
	first_name: {
        type: String, 
        required: [true, "A first name is required"], 
        minlength:[3, "A first name must have at least three characters"]
    },
	last_name: {
        type: String, 
        required: [true, "A last name is required"], 
        minlength:[3, "A last name must have at least three characters"]
    },
	password: {
        type: String, 
        required: [true, "A password is required!"], 
        minlength: [8, "A password must contain at least 8 characters"], 
        maxlength: [32, "A password cannot be more than 32 characters"], 
        validate: {
            validator: function(value){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
            },
            message: "Password failed validation, you must have at least one number, one uppercase, and a special character."
        }
    },
    bday: {
        type: Date, 
        required: [true, "A birthday is required"],
        validate: {
            validator: function(value){
                return value < new Date();
            },
            message: "Birthday must be in the past."
        }}
}, {timestamps: true })
UserSchema.set('validateBeforeSave', false);
UserSchema.plugin(uniqueValidator, {message: "This email is already taken, you can't have it!"});
var User = mongoose.model('User', UserSchema);
