import React, { useState } from 'react'

const Add = () => {
    const [movie, setMovie] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ","
    });

    return (
        <div className='form'>
            <h1>Add New Book</h1>
            <input type="text" placeholder='title' onChange={handleChange} name="title" />
            <input type="text" placeholder='desc' onChange={handleChange} name="desc" />
            <input type="number" placeholder='price' onChange={handleChange} name="price" />
            <input type="text" placeholder='cover' onChange={handleChange} name="cover" />
        </div>
    )
}

export default Add