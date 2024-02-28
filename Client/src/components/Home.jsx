import React, { useState } from 'react'
import DataList from './DataList'

function Home() {
  const [visible , setVisible] = useState(false)

  const toDisplay = () =>{
    setVisible(prev => !prev)
  }
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

                <button onClick={()=>{toDisplay()}}>{visible ? "Hide" : "Display"}</button>
        </div>

        <div id='game_list'>
            {visible && <DataList></DataList>}
        </div>



  <footer>
    <p>&copy; 2024 RetroGaming Haven. All rights reserved.</p>
  </footer>
    </>
  )
}

export default Home