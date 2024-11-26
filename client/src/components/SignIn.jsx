import React from 'react';
import '../css/signin.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignIn = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // Initialize the navigate function

    function receiveFormData(formData) {
        axios.post(`http://localhost:3000/api/users/login`, formData)
            .then(response => {
                if (response.status === 200) {
                    const token = response.headers['x-auth-token'];
                    if (token) {
                        localStorage.setItem('token', token); // Saveing the token in local storage
                        console.log('Login successful! Token:', token);
                        navigate('/'); // Redirect to the home page after sucess login 
                    }
                } else {
                    console.log('Unexpected response:', response);
                }
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    }

    return (
        <form className="form-signin" onSubmit={handleSubmit(receiveFormData)}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input
                {...register('email')}
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
            />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input
                {...register('password')}
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    );
};

export default SignIn;
