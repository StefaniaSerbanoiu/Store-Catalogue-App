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

  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  const isServerReachable = async () => {
    try {
      await axios.get('http://localhost:8080/shoe/all');
      return true;
    } catch (error) {
      return false;
    }
  };
  
  useEffect(() => {
    axios.get('http://localhost:8080/shoe/' + id)
    .then(result  => {
        setValues(result.data);
    })
    .catch(error => {
      console.error(error);
      // Attempt to retrieve the item from local storage
      const storedData = JSON.parse(localStorage.getItem('shoeData')) || [];
      const selectedItem = storedData.find(item => item.shoe_id == id);
      if (selectedItem) {
        setValues(selectedItem);
      } else {
        console.error('Item not found in local storage');
      }
    });
}, [id]);

  

const handleUpdate = async (event) => {
  event.preventDefault();

  try {
    const serverOnline = await isServerReachable();

    if (serverOnline) {
      const result = await axios.put(`http://localhost:8080/shoe/update/${id}`, values);
      console.log(result);
      window.confirm(`${values.product_name} was updated`);
      navigate("/");
    } else {
      console.log('Server is offline. Updating local storage...');


        // Append "(unsaved)" to the product name
        const productName = `${values.product_name} (unsaved)`;

        // Update local storage here
        const storedData = JSON.parse(localStorage.getItem('shoeData')) || [];
        const indexToUpdate = storedData.findIndex(item => item.shoe_id == id);
        if (indexToUpdate != -1) {
          storedData[indexToUpdate] = { ...storedData[indexToUpdate], ...values, product_name: productName };
          console.log(storedData[indexToUpdate]  )
        }

        // Save updated data back to local storage
        try {
          localStorage.setItem('shoeData', JSON.stringify(storedData));
        } catch (error) {
          console.error("Failed to update local storage:", error);
        }

        window.confirm(`${values.product_name} was updated (backend is offline, so changes will not remain)`);
        navigate("/");


    }
  } catch (error) {
    console.error(error);
  }
};




  return (
    <div className="d-flex vh-100 w-500 justify-content-center align-items-center">
      <div className="w-500 border shadow px-5 pt-3 pb-5 rounded" >
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
              <input 
                type="number" 
                className="form-control" 
                id="size" 
                name="size" 
                min="34" 
                max="46" 
                step='2' 
                required
                value={values.size} // Ensure the value is controlled by the state
                onChange={e => setValues({...values, size: parseInt(e.target.value, 10)})}
              />

              <small className="form-text text-muted">Size range: 34 - 46</small>
            </div>
    
            <div className='mb-2'>
              <label for="price">Price:</label>
              <input type="number" className="form-control" id="price" name="price" 
              value={values.price}
              onChange={elem => setValues({...values, price : elem.target.value})}
              />
            </div>
            
              <div className="d-flex justify-content-between">
              <button  className="btn btn-primary w-50">Save changes</button>
              <Link to="/" className="btn btn-secondary w-50 ms-3">Back</Link>
            </div>
          </form>
        </div>
      </div>
      )
}

export default Update
