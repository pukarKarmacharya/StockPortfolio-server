const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

//const JWT_SECRET_CODE = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5MTIwMDE4NywiaWF0IjoxNjkwODU0NTg3fQ.LWJV1RiQ0IjxUH0McZCAEYBID334Ls-xTmJ2R9svX4I';

const secretAccessKey =  process.env.JWT;

const userSchema = new mongoose.Schema({
    firstName:{
        type: String, required: true
    },
    lastName:{
        type: String, required: true
    },
    email:{
        type: String, required: true
    },
    password:{
        type: String, required: true
    },
    role:{
        type: String, required: true
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, secretAccessKey, {expiresIn: '7d'});
    return token
}

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName : Joi.string().required().label('First Name'),
        lastName : Joi.string().required().label('Last Name'),
        email : Joi.string().required().label('Email'),
        password : passwordComplexity().required().label('Password'),
        role: Joi.string().label('Role')
    });
    return schema.validate(data);
};


module.exports = {User, validate}