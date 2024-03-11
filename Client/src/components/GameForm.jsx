import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { validateGame } from '../../../dataValidator';




const GameForm = ({data , setData}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [choose , setChoose] = useState(false)
    const [isError , setIsError] = useState(false)
  const [formData, setFormData] = useState({
    GameTitle: '',
    ReleaseYear: '',
    Platform: '',
    Genre: '',
    DeveloperPublisher: '',
    Description: '',
    Rating: ''
});
  console.log(id)
  const selector = () =>{
    if (id){
      setChoose(true)
      
      setFormData(...data.filter(obj => obj._id == id))
    }else{
      setChoose(false)
    }
  }

  useEffect(() =>{
    selector()
  },[id])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitPost = async e => {
    e.preventDefault();
  
    try {
      // Validate form data
      const validatedData = validateGame(formData);

      const res = await axios.post('https://retrogames2024-uqzk.onrender.com/api/data', validatedData);
      console.log(res.data);
      setData([...data, res.data]);
      navigate("/home");
    } catch (error) {
      console.error('Error:', error);
      setIsError(true)
    }
  };
  

  const handleSubmitPut = async e => {
    e.preventDefault();

    try {
      const validatedData = validateGame(formData);

      const res = await axios.put(`https://retrogames2024-uqzk.onrender.com/api/data/${id}`, validatedData);
      console.log(res.data);
      setData(
        data.map(obj => {
          if (obj._id === id) {
            return formData
          }else{
            return obj
          }
        })
      )
    } catch (error) {
      console.error('Error:', error);
      setIsError(true)
    }
    navigate("/home")

  };

  console.log(formData)
  return (
    <div className='form-container'>
        <form onSubmit={choose ? handleSubmitPut : handleSubmitPost}>
      <input type="text" name="GameTitle" value={formData.GameTitle} onChange={handleChange} placeholder="Game Title" required />
      <input type="number" name="ReleaseYear" value={formData.ReleaseYear} onChange={handleChange} placeholder="Release Year" required />
      <input type="text" name="Platform" value={formData.Platform} onChange={handleChange} placeholder="Platform" required />
      <input type="text" name="Genre" value={formData.Genre} onChange={handleChange} placeholder="Genre" required />
      <input type="text" name="DeveloperPublisher" value={formData.DeveloperPublisher} onChange={handleChange} placeholder="Developer/Publisher" required />
      <textarea name="Description" value={formData.Description} onChange={handleChange} placeholder="Description" required />
      <input type="number" name="Rating" value={formData.Rating} onChange={handleChange} placeholder="Rating" required />
      <button type="submit">Submit</button>
      <p>{isError ? "invalid inputs" : ""}</p>
    </form>
    </div>
  );
};

export default GameForm;
