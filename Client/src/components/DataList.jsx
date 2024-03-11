import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DataList({ data, setData, auth }) {
    const [render, setRender] = useState(data);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://retrogames2024-uqzk.onrender.com/api/data/${id}`);
            setData(data.filter((obj) => obj._id !== id));
            setRender(render.filter((obj) => obj._id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(()=>{
        setRender(data)
    },[data])
    return (
        <>
            {render.map((game, index) => (
                <div className='game' key={index}>
                    <h3>{game.GameTitle}</h3>
                    <p>Year : {game.ReleaseYear}</p>
                    <p>Platform : {game.Platform}</p>
                    <p>Genre : {game.Genre}</p>
                    <p>Developer/Publisher : {game.DeveloperPublisher}</p>
                    <p>Description : {game.Description}</p>
                    <p>Rating : {game.Rating}/10</p>

                    {auth && <Link to={`/form/${game._id}`}><button>Update</button></Link>}
                    {auth && <button onClick={() => { handleDelete(game._id) }}>Delete</button>}
                </div>
            ))}
        </>
    );
}

export default DataList;
