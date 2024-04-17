import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CreateSuggestion() {
    const {id} = useParams(); // gets id from url

    const [values, setValues] = useState({
      title : '',
      advice : ''
    })

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
        console.error("Undetermined error while fetching data!", error);
    }
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const serverOnline = await isServerReachable();
    setIsOnline(serverOnline);

    if (serverOnline) {
    axios.post('http://localhost:8080/suggestion/add/' + id, values)
      .then(result => {
        console.log(result); console.log(values);
        window.confirm('New product added'); // Show success notification
        navigate(`/suggestions/${id}`);
      })
      .catch(err => console.log(err));
    }
    else {
        navigate("/");
        return;
      }
  };


  return (
    <div className="d-flex vh-100 w-500 justify-content-center align-items-center">
      <div className="w-500 border shadow px-5 pt-3 pb-5 rounded" >
        <h2>Add your style suggestions</h2>
          <form onSubmit={handleSubmit}>

            <div className='mb-2'>
              <label for="title">Title:</label>
              <input type="text" className="form-control" id="title" name="title" 
              value={values.title} // Ensure the value is controlled by the state
              onChange={elem => setValues({...values, title : elem.target.value})}
              />
            </div>
    
            <div className='mb-2'>
              <label for="advice">Style suggestion:</label>
              <input type="text" className="form-control" id="advice" name="advice" 
                value={values.advice} // Ensure the value is controlled by the state
                onChange={e => setValues({...values, advice: e.target.value})}
              />
              <small className="form-text text-muted">Add more details...</small>
            </div>
            
            <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-primary w-50">Add</button>
            <Link to={`/suggestions/${id}`} className="btn btn-secondary w-50 ms-3">Back</Link>
            </div>
          </form>
        </div>
      </div>
      )
}

export default CreateSuggestion;
