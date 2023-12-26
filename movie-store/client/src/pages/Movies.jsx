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

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/movies/" + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="movies">
                {movies.map(movie => (
                    <div className="movie" key={movie.id}>
                        {movie.cover && <img src={movie.cover} alt="" />}
                        <h2>{movie.title}</h2>
                        <p>{movie.desc}</p>
                        <span>Price: ${movie.price}</span>
                        <button className='delete' onClick={() => handleDelete(movie.id)}>Delete</button>
                        <button className='update'><Link to={`/update/${movie.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/add" className="add-button">Add new movie</Link>
            </button>
        </div>
    );
};

export default Movies