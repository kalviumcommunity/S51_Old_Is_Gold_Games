import React, { useEffect, useState } from 'react'
import DataList from './DataList'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import dummyData from "../../dummyData.json"

function Home({ data, setData }) {
  const [visible, setVisible] = useState(false)
  const [auth, setAuth] = useState(false)
  const [renderData ,setRenderData] = useState(dummyData) 
  const navigate = useNavigate()

  const toDisplay = () => {
    setVisible(prev => !prev)
  }

  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith(name + '='));
    if (cookieValue) {
      return cookieValue.split('=')[1];
    }
    return null;
  }

  const handleFilter = (e) =>{
    const input = e.target.value
    if (input == "All"){
      setRenderData(dummyData)
    }else{
      setRenderData(
        dummyData.filter((game) =>{
          return game.uploaded_by == input
        })
      )
    }
    
  }

  useEffect(() => {
    const token = getCookie("token")
    axios.post("http://localhost:3000/protected", { token: token })
      .then((res) => {
        setAuth(res.data.authenticated)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])
  const uniqueUsers = [...new Set(dummyData.map(game => game.uploaded_by))]
  return (
    <>
      <header><h1>Welcome to RetroGaming</h1></header>

      <div id='homeDiv'>
        <section id="about">
          <p>RetroGaming Haven is a curated collection of timeless classics, carefully selected to bring back cherished memories and introduce newcomers to the magic of old-school gaming. Whether you're a seasoned gamer or just starting your journey, there's something here for everyone to enjoy.</p>
        </section>

        <section id="features">
          <h2>Features</h2>
          <ul>
            <li><strong>Curated Selection:</strong> Handpicked list of iconic titles and hidden gems.</li>
            <li><strong>Nostalgic Experience:</strong> Immerse yourself in pixelated landscapes and classic gameplay.</li>
            <li><strong>Easy Navigation:</strong> User-friendly interface for seamless browsing.</li>
            <li><strong>Brief Descriptions:</strong> Get insights into each game's historical significance and gameplay mechanics.</li>
          </ul>
        </section>

        {auth && <button onClick={() => { navigate("/form") }}>Add Games</button>}
        <button onClick={() => { toDisplay() }}>{visible ? "Hide" : "Display"}</button>
        <select onChange={handleFilter} name="" id="">
          <option value="All">All</option>
            {uniqueUsers.map((name)=>{
              return (
                <option value={name}>{name}</option>
              )
            })}
        </select>
      </div>

      <div id='game_list'>
        {visible && <DataList data={renderData} setData={setData} auth={auth} />}
      </div>
      <footer>
        <p>&copy; 2024 RetroGaming Haven. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Home
