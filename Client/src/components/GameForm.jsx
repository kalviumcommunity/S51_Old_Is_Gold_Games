import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const GameForm = ({data , setData}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [choose , setChoose] = useState(false)
    
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
      const res = await axios.post('http://localhost:3000/api/data', formData);
      console.log(res.data);
      setData([...data , res.data])
    } catch (error) {
      console.error('Error:', error);
    }
    navigate("/")

  };

  const handleSubmitPut = async e => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:3000/api/data/${id}`, formData);
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
    }
    navigate("/")

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
    </form>
    </div>
  );
};

export default GameForm;
