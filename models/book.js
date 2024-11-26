import mongoose from "mongoose";
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long'], // Minimum length validation
        maxlength: [100, 'Title must not exceed 100 characters'] // Maximum length validation
    },
    author: {
        type: [String],
        required: [true, 'Author is required'],
        validate: {
            validator: function(v) {
                return v.length > 0; // Ensureing that there is at least one author in the author's array
            },
            message: 'A book must have at least one author'
        }
    },
    price: {
        type: Number,
        min: [0, 'Price must be a positive number'], // Price must not be negative
        required: function() {
            // Price is required if genre is specified
            return this.genre !== undefined && this.genre !== null;
        }
    },
    genre: {
        type: String,
        enum: ['Science Fiction'], //only 'Science Fiction'
    },
    publisher: [{
        name: {
            type: String,
            required: [true, 'Publisher name is required']
        },
        location: {
            type: String
        },
        establishedYear: {
            type: Number,
            required: [true, 'Established year is required'],
            min: [1450, 'Established year must be after 1450'], //no publisher before 1450
            max: [new Date().getFullYear(), 'Established year cannot be in the future'] // Established year must not exceed current year
        }
    }]
});

// Exporting the model, linked to Science_Friction collection
export default model('Book', bookSchema, 'Science_Friction');