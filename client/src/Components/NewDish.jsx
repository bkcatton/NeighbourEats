import React, { useState } from 'react';
import axiosConfig from '../axiosConfig';

const NewDish = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [servingSize, setServingSize] = useState(0)
  const [imageLink, setImageLink] = useState('')
  const [countryStyle, setCountryStyle] = useState('')
  const [availableStock, setAvailableStock] = useState(0)

  const onUpload = async (e) => {
    e.preventDefault();
    const newDish = await axiosConfig.post('/dishes/new', {
      title,
      description,
      price,
      servingSize,
      imageLink,
      countryStyle,
      availableStock,
    });
    console.log(newDish)
  }


  return (
    <div>
      NewDish
      <form>
        <input type="text" placeholder="enter dish title here" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder="enter dish description here" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <input type="number" placeholder="enter dish price here" value={price} onChange={(e) => setPrice(e.target.value)}/>
        <input type="number" placeholder="enter serving size here" value={servingSize} onChange={(e) => setServingSize(e.target.value)}/>
        <input type="text" placeholder="enter dish country of origin here" value={countryStyle} onChange={(e) => setCountryStyle(e.target.value)}/>
        <input type="text" placeholder="enter image here" value={imageLink} onChange={(e) => setImageLink(e.target.value)}/>
        <input type="number" placeholder="enter available stock here" value={availableStock} onChange={(e) => setAvailableStock(e.target.value)}/>
      <button onClick={(e)=> onUpload(e)}> Upload New Dish </button>
      </form>
    </div>);
};

export default NewDish;
