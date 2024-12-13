import { useForm } from 'react-hook-form';
import '../css/createform.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory

const CreateForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const onSubmit = async (data) => {
    try {
      // withCredentials is set true so that cookies are sent along with the request
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/books`, data, {
        withCredentials: true
      });
      
      console.log(response.data);
      // Redirect to the home page or list of books
      navigate('/');
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <div>
      <h2>Create New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Field */}
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            {...register('title', { 
              required: 'Title is required', 
              minLength: { value: 3, message: 'Title must be at least 3 characters long' },
              maxLength: { value: 100, message: 'Title must not exceed 100 characters' }
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        {/* Author Field */}
        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            {...register('author', { 
              required: 'Author is required' 
            })}
          />
          {errors.author && <p>{errors.author.message}</p>}
        </div>

        {/* Price Field */}
        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            {...register('price', { 
              required: 'Price is required', 
              min: { value: 0, message: 'Price must be a positive number' } 
            })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        {/* Genre Field */}
        <div>
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            {...register('genre', { required: 'Genre is required' })}
          >
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Biography">Biography</option>
            <option value="Non-Fiction">Non-Fiction</option>
            {/* Add more genres if necessary */}
          </select>
          {errors.genre && <p>{errors.genre.message}</p>}
        </div>

        {/* Publisher Name Field */}
        <div>
          <label htmlFor="publisherName">Publisher Name:</label>
          <input
            id="publisherName"
            type="text"
            {...register('publisher[0].name', { required: 'Publisher name is required' })}
          />
          {errors.publisher?.[0]?.name && <p>{errors.publisher[0].name.message}</p>}
        </div>

        {/* Publisher Location Field */}
        <div>
          <label htmlFor="publisherLocation">Publisher Location:</label>
          <input
            id="publisherLocation"
            type="text"
            {...register('publisher[0].location')}
          />
        </div>

        {/* Publisher Established Year Field */}
        <div>
          <label htmlFor="publisherEstablishedYear">Established Year:</label>
          <input
            id="publisherEstablishedYear"
            type="number"
            {...register('publisher[0].establishedYear', { 
              required: 'Established year is required', 
              min: { value: 1450, message: 'Established year must be after 1450' },
              max: { value: new Date().getFullYear(), message: 'Established year cannot be in the future' }
            })}
          />
          {errors.publisher?.[0]?.establishedYear && <p>{errors.publisher[0].establishedYear.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit">Create Book</button>
      </form>
    </div>
  );
};

export default CreateForm;
