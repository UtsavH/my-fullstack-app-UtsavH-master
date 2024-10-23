import mongoose from "mongoose";
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: [String],
        required: true 
    },
    price: Number,
    genre: String,
    publisher: [{
        name: {
            type: String,
            required: true 
        },
        location: String,
        establishedYear: {
            type: Number,
            required: true 
        }
    }]
});

// Exporting the model, linked to Science_Friction collection
export default model('Book', bookSchema, 'Science_Friction');
