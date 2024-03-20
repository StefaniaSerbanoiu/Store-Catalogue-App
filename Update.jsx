import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'


function Update() {
  const [values, setValues] = useState({
    product_name : '',
    size : 34,
    price : 0
  })

  const {id} = useParams(); // gets id from url
  
  useEffect(() => {
    axios.get('http://localhost:3000/shoes/' + id)
    .then(result  => {
        setValues(result.data);
    })
    .catch(err => console.log(err));
  }, [])

  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put('http://localhost:3000/shoes/' + id, values)
    .then(result  => {
      console.log(result);
      navigate("/");
    })
    .catch(err => console.log(err));
  }

  return (
    <div class="d-flex vh-100 w-500 justify-content-center align-items-center">
      <div class="w-500 border shadow px-5 pt-3 pb-5 rounded" >
          <h2>Update product info</h2>
          <form onSubmit={handleUpdate}>
            <div className='mb-2'>
              <label for="product_name">Name:</label>
              <input type="text" className="form-control" id="product_name" name="product_name" 
              value={values.product_name}
              onChange={elem => setValues({...values, product_name : elem.target.value})}
              />
            </div>
    
            <div className='mb-2'>
              <label for="size">Size:</label>
              <input type="number" className="form-control" id="size" name="size" min="34" max="46" step='2' 
              value={values.size}
              onChange={elem => setValues({...values, size : elem.target.value})}
              />
              <small class="form-text text-muted">Size range: 34 - 46</small>
            </div>
    
            <div className='mb-2'>
              <label for="price">Price:</label>
              <input type="number" className="form-control" id="price" name="price" 
              value={values.price}
              onChange={elem => setValues({...values, price : elem.target.value})}
              />
            </div>
            
              <div class="d-flex justify-content-between">
              <button  className="btn btn-primary w-50">Save changes</button>
              <Link to="/" className="btn btn-secondary w-50 ms-3">Back</Link>
            </div>
          </form>
        </div>
      </div>
      )
}

export default Update
