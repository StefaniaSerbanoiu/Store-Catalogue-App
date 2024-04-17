import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify'; 
import useStore from '../useStore';
import { useParams } from 'react-router-dom';

function Suggestions() {
  const [data, setData] = useState([]);
  const {id} = useParams(); // from url
  //const [selectedItems, setSelectedItems] = useState([]);
  //const { data, setData, selectedItems, setSelectedItems } = useStore();


  useEffect(() => {
    console.log('ID from URL:', id); // Add this line to log the value of id
    axios.get('http://localhost:8080/shoe/suggestions/' + id)
      .then(result => {
        setData(result.data);
        console.log(result.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  
  return (
    <div className='d-flex flex-column justify-content-center align-items-center center'>
      <h1>Style advice</h1>
      <div className='w=75 rounded border shadow p-4'>
        <div className='d-flex justify-content-end mb-3'>
          <Link to={`/createSuggestion/${id}`} className='btn btn-light'>New +</Link>
        </div>
        <table className='table table-stipend'>
          <thead>
            <tr>
              <th>Advice</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={index}>
                <td>{d.title}</td>
                <td>{d.advice}</td>
                <td>
                  <Link to={`/updateSuggestion/${d.suggestion_id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                  <button onClick={() => handleDelete(d.suggestion_id)} className='btn btn-sm btn-danger me-2'>Delete</button>
                  <Link to={`/read/${id}`} className='btn btn-sm btn-info'>See product details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


const handleDelete = (id) => {
  const confirmDeleteMessage = window.confirm("Are you sure you want to delete this tip? Deletion can't be undone.");
  if (confirmDeleteMessage) {
    axios.delete(`http://localhost:8080/suggestion/delete/${id}`)
      .then(result => {
        location.reload();
        window.confirm("Successful deletion");
      })

      .catch(err => {
        console.error(err);
      });
  }
}

export default Suggestions;