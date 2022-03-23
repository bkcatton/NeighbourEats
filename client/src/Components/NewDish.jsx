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
  const [imageLink, setImageLink] = useState('https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png');
  const [countryStyle, setCountryStyle] = useState('');

  const { user } = useContext(UserContext);
  const { userId } = user;

  const onUpload = async e => {
    e.preventDefault();

    await axiosConfig.post('/dishes/new', {
      title,
      description,
      price,
      imageLink,
      countryStyle,
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
          margin="normal"
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
          margin="normal"
          value={description}
          onChange={e => setDescription(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          multiline
          variant="standard"
        />
        <FormControl variant="standard" margin="normal">
          <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={price}
            onChange={e => setPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <TextField
          type="text"
          label="Country of Origin"
          margin="normal"
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
          margin="normal"
          value={imageLink}
          onChange={e => setImageLink(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
      </Stack>
      <img src={imageLink} alt="" />
      <Button onClick={e => onUpload(e)}>Submit</Button>
    </Box>
  );
};

export default NewDish;
