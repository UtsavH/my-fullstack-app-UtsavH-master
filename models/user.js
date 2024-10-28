import { passwordStrength } from "check-password-strength";
import mongoose from "mongoose";
const { Schema, model } = mongoose;


const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        maxlength: [100, 'first name must not exceed 100 characters']
    },
    lastName:{
        type: String,
        required: true,
        maxlength: [100, 'first name must not exceed 100 characters']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function(value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [255, 'Password must not exceed 255 characters'],
        // min:[8,'minimum it should be 8 character long']
        validate:{ 
            validator: v=>{
                const result = passwordStrength(v)

                return (result.value==="Medium" || result.value==="Strong")
            },
            message:"password too weak, Must be at least Medium strength "
        }
    }
});






export default model('User', userSchema);