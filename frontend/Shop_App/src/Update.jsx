import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useTokenStore from './Stores/useTokenStore';
import useUserStore from './Stores/useUserStore';


function Update() {
  const [values, setValues] = useState({
    product_name : '',
    size : 34,
    price : 0
  })

  const tokenFromStore = useTokenStore((state) => state.token)
  const setToken = useTokenStore((state) => state.setToken)

  const usernameFromStore = useUserStore((state) => state.username)
  const setUsernameFromStore = useUserStore((state) => state.setUsername)

  const {id} = useParams(); // gets id from url

  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  const isServerReachable = async () => {
    try {
      await axios.get('https://charming-cooperation-production.up.railway.app/shoe/all', {
      //await axios.get('http://localhost:8080/shoe/all', {
        headers: {
          Authorization: `Bearer ${tokenFromStore}` // Include token in the request headers
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  };
  
  useEffect(() => {
    axios.get('https://charming-cooperation-production.up.railway.app/shoe/' + id, {
    //axios.get('http://localhost:8080/shoe/' + id, {
      headers: {
        Authorization: `Bearer ${tokenFromStore}` // Include token in the request headers
      }
    })
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
      const result = await axios.put(`https://charming-cooperation-production.up.railway.app/shoe/update/${id}`, values, {
      //const result = await axios.put(`http://localhost:8080/shoe/update/${id}`, values, {
        headers: {
          Authorization: `Bearer ${tokenFromStore}` // Include token in the request headers
        }
      });
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
                value={values.size} // Ensure the value is controlled by the state
                onChange={elem => setValues({...values, size: elem.target.value})}
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
