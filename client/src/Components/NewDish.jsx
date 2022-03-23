import React, { useState, useContext } from 'react';
import axiosConfig from '../axiosConfig';
import { UserContext } from '../Providers/UserProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

const NewDish = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [countryStyle, setCountryStyle] = useState('');
  const [availableStock, setAvailableStock] = useState();

  const { user } = useContext(UserContext);
  const { userId } = user;

  const onUpload = async e => {
    e.preventDefault();

    await axiosConfig.post('/dishes/new', {
      title,
      description,
      price,
      servingSize,
      imageLink,
      countryStyle,
      availableStock,
      userId,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack>
        <TextField
          id="outlined-name"
          label="Dish Name"
          value={title}
          onChange={e => setTitle(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          multiline
          variant="standard"
        />
        <FormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={price}
            onChange={e => setPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <TextField
          label="Serving Size"
          type="number"
          value={servingSize}
          onChange={e => setServingSize(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          type="text"
          label="Country of Origin"
          value={countryStyle}
          onChange={e => setCountryStyle(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          type="text"
          label="Image"
          value={imageLink}
          onChange={e => setImageLink(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          label="Available Stock"
          type="number"
          value={availableStock}
          onChange={e => setAvailableStock(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
      </Stack>
      <Button onClick={e => onUpload(e)}>Submit</Button>
    </Box>
  );
};

export default NewDish;
