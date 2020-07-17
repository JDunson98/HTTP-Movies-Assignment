import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: '',
};

const UpdateMovie = props => {
    const { push } = useHistory();
    const { id } = useParams();
    const [ movieValues, setMovieValues ] = useState(initialValues);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res);
            setMovieValues(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [id])

    const handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;

        setMovieValues({
            ...movieValues,
            [name]: value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/movies/${id}`, movieValues)
            .then(res => {
                console.log(res);
                setMovieValues(initialValues);
                push(`movies/${id}`);
                props.setRefresh(true);
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h3>Update Movie</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>
                    <input 
                        type="text"
                        name="title" 
                        onChange={handleChange} 
                        value={movieValues.title} 
                        placeholder="title" 
                    />
                </label>
                <label htmlFor='director'>
                    <input 
                        type="text"
                        name="director"
                        onChange={handleChange}
                        value={movieValues.director}
                        placeholder="director"
                    />
                </label>
                <label htmlFor='metascore'>
                    <input 
                        type="text"
                        name="metascore"
                        onChange={handleChange}
                        value={movieValues.metascore}
                        placeholder="metascore"
                    />
                </label>
                <label htmlFor='start'>
                    <input 
                        type="text"
                        name="stars"
                        onChange={handleChange}
                        value={movieValues.stars}
                        placeholder="stars"
                    />
                </label>

                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;