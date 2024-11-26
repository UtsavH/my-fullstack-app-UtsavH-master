import mongoose from 'mongoose';
const {Schema, model}= mongoose


const loginSchema= new Schema({
    email:{
        type: String,
        required: [true,"Email is required"]
    },
    password:{
        type: String,
        required: [true,"passowrd is required"]
    }
},{collection: 'users'});

export default  model('Login', loginSchema);