import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library
import { useNavigate, useParams } from 'react-router-dom';

const EditForm = () => {
    const { id } = useParams(); // Get the id from the URL
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm(); // Set up react-hook-form
    const [loading, setLoading] = useState(true);
    const [submitError, setSubmitError] = useState(null); // State to track submit error
    const [formData, setFormData] = useState(null);

    // Fetch existing data to pre-populate the form
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
                setFormData(response.data);
                setLoading(false);

                // Prepopulate form values with fetched data
                setValue('title', response.data.title);
                setValue('author', response.data.author.join(', ')); // Join authors as a string
                setValue('genre', response.data.genre);
                setValue('imageUrl', response.data.imageUrl);
                setValue('price', response.data.price);
                setValue('publisher', response.data.publisher[0].name); // Assume first publisher if array
            } catch (error) {
                console.error('Error fetching item:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            const updatedData = { 
                ...data,
                author: data.author.split(',').map(item => item.trim()), // Convert authors from string to array
                publisher: [{ name: data.publisher, location: "", establishedYear: null }] // Modify as needed
            };
    
            // Sending the PUT request with the updated data
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/books/${id}`,
                updatedData,
                {
                    headers: {
                        'Authorization': 'Bearer token_placeholder', // You don't need to manually send the token
                    },
                    withCredentials: true, // Ensure the cookie is included with the request
                }
            );
    
            console.log('Response:', response);
    
            if (response.status === 200) {
                navigate(`/books/${id}`); // Navigate to the updated book page
            }
    
        } catch (error) {
            console.error('Error updating book:', error);
            setSubmitError('An error occurred while updating the book. Please try again.');
        }
    };
    

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while data is being fetched
    }

    return (
        <div className="edit-form-container">
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {submitError && <p className="error">{submitError}</p>} {/* Show error message if any */}
                
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        id="title"
                        type="text"
                    />
                    {errors.title && <p className="error">{errors.title.message}</p>}
                </div>
                <div>
                    <label htmlFor="author">Author(s)</label>
                    <input
                        {...register('author', { required: 'Author is required' })}
                        id="author"
                        type="text"
                    />
                    {errors.author && <p className="error">{errors.author.message}</p>}
                </div>
                <div>
                    <label htmlFor="genre">Genre</label>
                    <input
                        {...register('genre', { required: 'Genre is required' })}
                        id="genre"
                        type="text"
                    />
                    {errors.genre && <p className="error">{errors.genre.message}</p>}
                </div>
                <div>
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        {...register('imageUrl', { required: 'Image URL is required' })}
                        id="imageUrl"
                        type="text"
                    />
                    {errors.imageUrl && <p className="error">{errors.imageUrl.message}</p>}
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        {...register('price', { required: 'Price is required', valueAsNumber: true })}
                        id="price"
                        type="number"
                        step="0.01"
                    />
                    {errors.price && <p className="error">{errors.price.message}</p>}
                </div>
                <div>
                    <label htmlFor="publisher">Publisher</label>
                    <input
                        {...register('publisher', { required: 'Publisher is required' })}
                        id="publisher"
                        type="text"
                    />
                    {errors.publisher && <p className="error">{errors.publisher.message}</p>}
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditForm;
