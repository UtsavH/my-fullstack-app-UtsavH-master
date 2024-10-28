import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import Login from '../../models/login.js';
import dotenv from 'dotenv';

dotenv.config(); // Loading environment variables from .env file

const router = express.Router();



router.post('/register', async (req, res) => {
    try {
        // Validateing user input fields according to the schema
        await User.validate(req.body);

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Createing a new user with hashed password and other fields
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        });

        // Saveing the new user
        const savedUser = await newUser.save();

        // Responding with the newly created user's email and _id
        res.status(201).json({
            email: savedUser.email,
            _id: savedUser._id
        });
    } catch (error) {
        // Handleing validation or other server errors
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Invalid data', details: error.errors });
        } else if (error.code === 11000) { // Handleing duplicate email error
            res.status(409).json({ message: 'Email already in use' });
        } else {
            res.status(500).json({ message: 'Server error', error });
        }
    }
})



//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        // if (!email || !password) {
        //     return res.status(400).json({ message: 'Email and password are required' });
        // }


        // Validate login data using the Login schema
        const loginData = new Login({ email, password });
        try {
            await loginData.validate();
        } catch (validationError) {
            // If validation fails, send a 400 status with validation error details
            return res.status(400).json({ message: 'Invalid data', details: validationError.errors });
        }

        // Find user by email using the User model
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with the JWT in the custom header and a success message
        res.setHeader('x-auth-token', token);
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Invalid data', details: error.errors });
        }
        res.status(500).json({ message: 'Server error', error });
    }
});



// module.exports = router;
export default router;