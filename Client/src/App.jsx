import React, { useState, useEffect } from 'react';
import {BrowserRouter ,Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import GameForm from './components/GameForm';
import AuthPage from './components/AuthPage'
function App() {
  // const navigate = useNavigate()
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])

  console.log(data)
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<AuthPage></AuthPage>}></Route>
        <Route path='/home' element={<Home data={data} setData={setData} />} />
        <Route path="/form" element={<GameForm  data={data} setData={setData}/>} />
        <Route path="/form/:id" element={<GameForm  data={data} setData={setData}/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
