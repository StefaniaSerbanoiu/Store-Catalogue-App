import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Create() {
  const [values, setValues] = useState({
    product_name : '',
    size : 34,
    price : 0
  })

const navigate = useNavigate();

const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/shoes', values)
    .then(result  => {
      console.log(result);
      navigate("/");
    })
    .catch(err => console.log(err));

 };


return (
<div class="d-flex vh-100 w-500 justify-content-center align-items-center">
  <div class="w-500 border shadow px-5 pt-3 pb-5 rounded" >
      <h2>Add New Shoe</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label for="product_name">Name:</label>
          <input type="text" class="form-control" id="product_name" name="product_name" placeholder="Enter the product's name" required
          onChange={element => setValues({...values, product_name : element.target.value})}
          />
        </div>

        <div className='mb-2'>
          <label for="size">Size:</label>
          <input type="number" class="form-control" id="size" name="size" min="34" max="46" step='2' required
          onChange={element => setValues({...values, size : element.target.value})}
          />
          <small class="form-text text-muted">Size range: 34 - 46</small>
        </div>

        <div className='mb-2'>
          <label for="price">Price:</label>
          <input type="number" class="form-control" id="price" name="price" required
          onChange={element => setValues({...values, price : element.target.value})}
          />
        </div>
        
          <div class="d-flex justify-content-between">
          <button  className="btn btn-primary w-50">Add</button>
          <Link to="/" className="btn btn-secondary w-50 ms-3">Back</Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Create
