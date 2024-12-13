
import { useEffect, useState } from 'react';
import '../css/main.css';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';

const Main = () => {
  const [data, setData] = useState([]); // To store books data
  const [searchQuery, setSearchQuery] = useState(''); // To store the search query

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/books`, { withCredentials: true })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the books based on search query
  const filteredBooks = data.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.author.some(author => author.toLowerCase().includes(query)) ||
      item.genre.toLowerCase().includes(query)
    );
  });

  // Function to handle book deletion
  const handleDeleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/books/${bookId}`, { withCredentials: true });
      console.log(response.data.message);
      // After successful deletion, remove the book from the state
      setData(data.filter(book => book._id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for books"
              value={searchQuery}
              onChange={handleSearchChange} // Call handleSearchChange on input change
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {/* Render filtered books */}
            {filteredBooks.length > 0 ? (
              filteredBooks.map((item) => (
                <Card 
                  key={item._id} 
                  item={item} 
                  onDelete={handleDeleteBook}  // Pass the handleDeleteBook function to Card component
                />
              ))
            ) : (
              <p>No books found</p> // Message if no books match the search query
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;