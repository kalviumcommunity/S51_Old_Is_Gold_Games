import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const GameForm = ({data , setData}) => {

    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    GameTitle: '',
    ReleaseYear: '',
    Platform: '',
    Genre: '',
    DeveloperPublisher: '',
    Description: '',
    Rating: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
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

  return (
    <div className='form-container'>
        <form onSubmit={handleSubmit}>
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
