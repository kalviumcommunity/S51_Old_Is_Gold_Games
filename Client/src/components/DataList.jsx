import React from 'react'
import dummyData from "../../dummyData.json"

function DataList() {
  return (
    <>
        {
            dummyData.map((game, index) =>{
                return (
                    <>
                    <div className='game' key={index}>
                        <h3>{game.GameTitle}</h3>
                        <p>Year : {game.ReleaseYear}</p>
                        <p>Platform : {game.Platform}</p>
                        <p>Genre : {game.Genre}</p>
                        <p>Developer/Publisher : {game.DeveloperPublisher}</p>
                        <p>Description : {game.Description}</p>
                        <p>Rating : {game.Rating}/10</p>
                    </div>
                    </>
                )
            })
        }
    </>
  )
}

export default DataList