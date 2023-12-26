import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const [movie, setMovie] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ","
    });

    const navigate = useNavigate()
    const location = useLocation()

    const movieId = location.pathname.split("/")[2]

    const handleChange = (e) => {
        setMovie(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    console.log(movie)

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:8800/movies/" + movieId, movie)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='form'>
            <h1>Update the Movie</h1>
            <input type="text" placeholder='title' onChange={handleChange} name="title" />
            <input type="text" placeholder='desc' onChange={handleChange} name="desc" />
            <input type="number" placeholder='price' onChange={handleChange} name="price" />
            <input type="text" placeholder='cover' onChange={handleChange} name="cover" />
            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
    );
};

export default Update