import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useTokenStore from '../Stores/useTokenStore';
import useUserStore from '../Stores/useUserStore';


function UpdateSuggestion() {
  const {shoe_id, id} = useParams(); // gets id from url

  const tokenFromStore = useTokenStore((state) => state.token)
  const setToken = useTokenStore((state) => state.setToken)

  const usernameFromStore = useUserStore((state) => state.username)
  const setUsernameFromStore = useUserStore((state) => state.setUsername)

  const [values, setValues] = useState({
    title : '',
    description : ''
  })

  
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
  

  useEffect(() => { // get advice details
    axios.get('https://charming-cooperation-production.up.railway.app/suggestion/' + id, {
    //axios.get('http://localhost:8080/suggestion/' + id, {
      headers: {
        Authorization: `Bearer ${tokenFromStore}` // Include token in the request headers
      }
    })
    .then(result  => {
        setValues(result.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [id]);

  

const handleUpdate = async (event) => {
  event.preventDefault();

  try {
    const serverOnline = await isServerReachable();

    if (serverOnline) {
      const result = await axios.put(`https://charming-cooperation-production.up.railway.app/suggestion/update/${id}`, values, {
      //const result = await axios.put(`http://localhost:8080/suggestion/update/${id}`, values, {
        headers: {
          Authorization: `Bearer ${tokenFromStore}` // Include token in the request headers
        }
      });
      console.log(result);
      window.confirm(`"${values.title}" was updated`);
      window.location.href = '/suggestions/' + shoe_id;
    } 
  } catch (error) {
    console.error(error);
  }
};




  return (
    <div className="d-flex vh-100 w-500 justify-content-center align-items-center">
      <div className="w-500 border shadow px-5 pt-3 pb-5 rounded" >
          <h2>Change suggestion</h2>
          <form onSubmit={handleUpdate}>

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
            
              <div className="d-flex justify-content-between">
              <button  className="btn btn-primary w-50">Save changes</button>
              <Link to={`/suggestions/${shoe_id}`} className="btn btn-secondary w-50 ms-3">Back</Link>
            </div>
          </form>
        </div>
      </div>
      )
}

export default UpdateSuggestion
