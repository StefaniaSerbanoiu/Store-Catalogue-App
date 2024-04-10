import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Create() {
  const [values, setValues] = useState({
    product_name: '',
    size: 34,
    price: 0
  });

  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  const isServerReachable = async () => {
    try {
      await axios.get('http://localhost:8080/shoe/all');
      return true;
    } catch (error) {
      if (error instanceof Error) { 
        console.error("Error fetching data!", error.message, error.stack); 
    } else {
        console.error("Undetermined error while getching data!", error);
    }
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const serverOnline = await isServerReachable();
    setIsOnline(serverOnline);

    if (!serverOnline) {
      // Append "(unsaved)" to the product name
      const productName = `${values.product_name} (unsaved)`;
      // Store the new item in local storage
      const storedData = JSON.parse(localStorage.getItem('shoeData')) || [];
      storedData.push({ ...values, product_name: productName });
      localStorage.setItem('shoeData', JSON.stringify(storedData));
      // Show success notification
      window.confirm('New product added (backend is offline, so changes will not remain)');
      navigate("/");
      return;
    }

    // If the server is reachable, make the POST request
    axios.post('http://localhost:8080/shoe/add', values)
      .then(result => {
        console.log(result);
        // Show success notification
        window.confirm('New product added');
        navigate("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 w-500 justify-content-center align-items-center">
      <div className="w-500 border shadow px-5 pt-3 pb-5 rounded" >
        <h2>Add New Shoe</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor="product_name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="product_name"
              name="product_name"
              placeholder="Enter the product's name"
              required
              onChange={element => setValues({ ...values, product_name: element.target.value })}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor="size">Size:</label>
            <input
              type="number"
              className="form-control"
              id="size"
              name="size"
              min="34"
              max="46"
              step='2'
              required
              onChange={element => setValues({ ...values, size: element.target.value })}
            />
            <small className="form-text text-muted">Size range: 34 - 46</small>
          </div>

          <div className='mb-2'>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              required
              onChange={element => setValues({ ...values, price: element.target.value })}
            />
          </div>

          <div>
            <span>{values.product_name}</span>
            {!isOnline && <span> (unsaved)</span>}
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-primary w-50">Add</button>
            <Link to="/" className="btn btn-secondary w-50 ms-3">Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
