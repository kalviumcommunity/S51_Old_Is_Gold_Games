import React from 'react'
// import dummyData from "../../dummyData.json"
import axios from 'axios'
import { Link } from 'react-router-dom'
function DataList({data ,setData,auth}) {
    const handleDelete = async (id) =>{
        try {
            const res = await axios.delete(`http://localhost:3000/api/data/${id}`)
            console.log(res.data);
            setData(
                data.filter((obj) =>{
                    return obj._id != id
                })
            )
          } catch (error) {
            console.error('Error:', error);
          }
    }
  return (
    <>
        {
            data.map((game, index) =>{
                return (
                    <>
                    <div className='game' key={game._id}>
                        <h3>{game.GameTitle}</h3>
                        <p>Year : {game.ReleaseYear}</p>
                        <p>Platform : {game.Platform}</p>
                        <p>Genre : {game.Genre}</p>
                        <p>Developer/Publisher : {game.DeveloperPublisher}</p>
                        <p>Description : {game.Description}</p>
                        <p>Rating : {game.Rating}/10</p>

                        {auth && <Link to={`/form/${game._id}`}><button>Update</button></Link>}
                        {auth && <button onClick={()=>{handleDelete(game._id)}}>Delete</button>}
                    </div>
                    </>
                )
            })
        }
    </>
  )
}

export default DataList