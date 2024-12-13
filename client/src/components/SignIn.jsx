import React from 'react';
import '../css/signin.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const SignIn = (props) => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        mode: 'onSubmit', // Ensures validation is triggered when the form is submitted
    });
    const navigate = useNavigate();

    // Handle form submission
    async function receiveFormData(formData) {
        console.log(formData);
        authService.signIn(formData, (success) => {
            if (success) {
                sessionStorage.setItem('isLoggedIn', 'true');
                navigate('/');
            } else {
                console.log('unsuccessful login');
                // Optionally, you could set an error here for invalid login:
                setError("email", {
                    type: "manual",
                    message: "Invalid email or password",
                });
            }
        });
    }

    return (
        <form className="form-signin" onSubmit={handleSubmit(receiveFormData)}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
            
            {/* Email Input */}
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input
                {...register('email', { 
                    required: 'Email address is required',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email format',
                    },
                })}
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
            />
            {/* Display email validation errors */}
            {errors.email && <span className="text-danger">{errors.email.message}</span>}

            {/* Password Input */}
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input
                {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                })}
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
            />
            {/* Display password validation errors */}
            {errors.password && <span className="text-danger">{errors.password.message}</span>}

            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    );
};

export default SignIn;