import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                const res = await axios.get("http://localhost:8800/movies");
                console.log(res);
                setMovies(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllMovies();
    }, []);

    return (
        <div>
            <h1>Yajur's Movie Shop</h1>
            <div className="movies">
                {movies.map(movie => (
                    <div className="movie" key={movie.id}>
                        {movie.cover && <img src={movie.cover} alt="" />}
                        <h2>{movie.title}</h2>
                        <p>{movie.desc}</p>
                        <span>{movie.price}</span>
                    </div>
                ))}
            </div>
            <button>
                <Link to="add">Add new movie</Link>
            </button>
        </div>
    );
};

export default Movies