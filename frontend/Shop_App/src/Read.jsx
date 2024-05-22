import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import useTokenStore from './Stores/useTokenStore';
import useUserStore from './Stores/useUserStore';

function Read() {
  const [data, setData] = useState([])
  const {id} = useParams(); // gets id from url

    const tokenFromStore = useTokenStore((state) => state.token)
    const setToken = useTokenStore((state) => state.setToken)

    const usernameFromStore = useUserStore((state) => state.username)
    const setUsernameFromStore = useUserStore((state) => state.setUsername)

  
  useEffect(() => {
    console.log('ID from URL:', id); // Add this line to log the value of id
    axios.get('https://charming-cooperation-production.up.railway.app/shoe/' + id, {
    // axios.get('http://localhost:8080/shoe/' + id, {
      headers: {
        Authorization: `Bearer ${tokenFromStore}` // Include token in the request headers
      }
    })
      .then(result => {
        setData(result.data);
        console.log(result.data)
      })
      .catch(error => {
        console.error(error);
        // Attempt to retrieve the item from local storage
        const storedData = JSON.parse(localStorage.getItem('shoeData')) || [];
        const selectedItem = storedData.find(item => item.shoe_id == id);
        if (selectedItem) {
          setData(selectedItem);
        } else {
          console.error('Item not found in local storage');
        }
      });
  }, [id]);


  return (
    <div className="d-flex vh-100 w-500 justify-content-center align-items-center">
      <div className="w-500 border shadow px-5 pt-3 pb-5 rounded" >
          <h2>Details</h2>

            <div className='mb-2'>
              <strong>Product name: {data.product_name}</strong>
            </div>
    
            <div className='mb-2'>
            <strong>Size: {data.size}</strong>
            </div>
    
            <div className='mb-2'>
              <strong>Price: {data.price}</strong>
            </div>

            <div className='mb-2'>
              <strong>Added by: {usernameFromStore}</strong>
            </div>
            
            <div className="d-flex justify-content-between">
            <Link to={`/update/${id}`} className="btn btn-primary w-50">Edit</Link>
            <Link to ="/" className="btn btn-secondary w-50 ms-3">Back</Link>
            </div>
        </div>
      </div>
    )
}

export default Read
