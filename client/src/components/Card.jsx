// export default Card;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ item, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (item._id) {
      navigate(`/edit/${item._id}`);
    } else {
      console.error('No _id found for item:', item);
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      onDelete(item._id); // Call the onDelete function passed from Main.jsx
    }
  };

  return (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <img
          className="card-img-top"
          alt={item.title}
          style={{ height: 225, width: '100%', display: 'block' }}
          src={item.imageUrl}
        />
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5> {/* Book title */}
          <p className="card-text">
            <strong>Author(s):</strong> {item.author.join(', ')} {/* Book authors */}
          </p>
          <p className="card-text">
            <strong>Genre:</strong> {item.genre} {/* Book genre */}
          </p>
          <p className="card-text">
            <strong>Price:</strong> ${item.price.toFixed(2)} {/* Book price */}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              {/* Action buttons */}
              <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleEdit}>Edit</button>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;