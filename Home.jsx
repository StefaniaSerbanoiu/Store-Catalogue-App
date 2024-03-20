import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/shoes')
    //.then(result  => console.log(result))
    .then(result  => setData(result.data))
    .catch(err => console.log(err));
  }, [])

  return (
    //
    <div className = 'd-flex flex-column justify-content-center align-items-center center'>
      <h1>List of products</h1>
      <div className='w=75 rounded border shadow p-4'>
      <div className='d-flex justify-content-end'>
        <Link to="/create" className='btn btn-light'>New +</Link>  
      </div>
        <table className='table table-stipend'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((d, index) => (
                <tr key={index}>
                  <td>{d.product_name}</td>
                  <td>{d.size}</td>
                  <td>{d.price}</td>
                  <td>
                    <Link to={`/update/${d.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                    <button onClick={element => handleDelete(d.id)} className='btn btn-sm btn-danger me-2'>Delete</button>
                    <Link to={`/read/${d.id}`} className='btn btm-sm btn-info'>More</Link>
                  </td>
                </tr>
              )
              // () -> can print
              // {} -> need return
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

const handleDelete = (id) => {
  const confirmDeleteMessage = window.confirm("Are you sure you want to delete this product? Deletion of products can't be undone.")
  if(confirmDeleteMessage) {
      axios.delete('http://localhost:3000/shoes/' + id)
      .then(result => {
          location.reload();
      })
      .catch(err => console.log(err));
  }
}


export default Home
