import React from 'react';
import '../css/register.css'; // Ensure the file exists or replace with correct path
import { useForm } from 'react-hook-form';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // Initialize navigate function for redirection

    function receiveFormData(formData) {
        authService.register(formData, (success) => {
            if (success) {
                console.log('Registration successful!');
                navigate('/'); // Redirect to home page or other destination
            } else {
                console.log('Registration failed');
            }
        });
    }

    return (
        <form className="form-register" onSubmit={handleSubmit(receiveFormData)}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Register</h1>

            {/* First Name Input */}
            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
            <input
                {...register('firstName', { required: 'First name is required' })}
                type="text"
                id="inputFirstName"
                className="form-control"
                placeholder="First Name"
            />
            {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}

            {/* Last Name Input */}
            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
            <input
                {...register('lastName', { required: 'Last name is required' })}
                type="text"
                id="inputLastName"
                className="form-control"
                placeholder="Last Name"
            />
            {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}

            {/* Email Input */}
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input
                {...register('email', { 
                    required: 'Email address is required',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email format'
                    }
                })}
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
            />
            {errors.email && <span className="text-danger">{errors.email.message}</span>}

            {/* Password Input */}
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input
                {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters long'
                    }
                })}
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
            />
            {errors.password && <span className="text-danger">{errors.password.message}</span>}

            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
    );
};

export default Register;