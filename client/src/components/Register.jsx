// import React from 'react';
// import '../css/register.css'; // Ensure the file exists or replace with correct path
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// const Register = () => {
//     const { register, handleSubmit } = useForm();

//     function receiveFormData(formData) {
//         axios.post(`http://localhost:3000/api/users/register`, formData)
//             .then(response => {
//                 const token = response.headers.authorization;
//                 if (token) {
//                     localStorage.setItem('token', token);
//                     console.log('Registration successful! Token:', token);
//                 } else {
//                     console.log('Registration successful, but no token returned.');
//                 }
//             })
//             .catch(error => {
//                 console.error('Registration error:', error);
//             });
//     }

//     return (
//         <form className="form-register" onSubmit={handleSubmit(receiveFormData)}>
//             <h1 className="h3 mb-3 font-weight-normal text-center">Register</h1>

//             <label htmlFor="inputFirstName" className="sr-only">First Name</label>
//             <input
//                 {...register('firstName')}
//                 type="text"
//                 id="inputFirstName"
//                 className="form-control"
//                 placeholder="First Name"
//             />

//             <label htmlFor="inputLastName" className="sr-only">Last Name</label>
//             <input
//                 {...register('lastName')}
//                 type="text"
//                 id="inputLastName"
//                 className="form-control"
//                 placeholder="Last Name"
//             />

//             <label htmlFor="inputEmail" className="sr-only">Email address</label>
//             <input
//                 {...register('email')}
//                 type="email"
//                 id="inputEmail"
//                 className="form-control"
//                 placeholder="Email address"
//             />

//             <label htmlFor="inputPassword" className="sr-only">Password</label>
//             <input
//                 {...register('password')}
//                 type="password"
//                 id="inputPassword"
//                 className="form-control"
//                 placeholder="Password"
//             />

//             <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
//         </form>
//     );
// };

// export default Register;

import React from 'react';
import '../css/register.css'; // Ensure the file exists or replace with correct path
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Register = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate(); // Initialize navigate function for redirection

    function receiveFormData(formData) {
        axios.post(`http://localhost:3000/api/users/register`, formData)
            .then(response => {
                const token = response.headers['x-auth-token']; // Get token from headers
                if (token) {
                    localStorage.setItem('token', token); // Save token in localStorage
                    console.log('Registration successful! Token:', token);
                    navigate('/'); // Redirect to the home page
                } else {
                    console.log('Registration successful, but no token returned.');
                }
            })
            .catch(error => {
                console.error('Registration error:', error.response?.data || error.message);
            });
    }

    return (
        <form className="form-register" onSubmit={handleSubmit(receiveFormData)}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Register</h1>

            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
            <input
                {...register('firstName')}
                type="text"
                id="inputFirstName"
                className="form-control"
                placeholder="First Name"
            />

            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
            <input
                {...register('lastName')}
                type="text"
                id="inputLastName"
                className="form-control"
                placeholder="Last Name"
            />

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

            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
    );
};

export default Register;
