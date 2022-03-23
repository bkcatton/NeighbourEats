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
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(6),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const NewDish = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageLink, setImageLink] = useState('');
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
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" gutterBottom component="div" textAlign="center">
        Create a New Dish!
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
      >
        <Item sx={{ width: '50%' }}>
          <TextField
            id="outlined-name"
            fullWidth
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
            fullWidth
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
          <FormControl variant="standard" margin="normal" fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
            <Input
              id="standard-adornment-amount"
              fullWidth
              value={price}
              onChange={e => setPrice(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <TextField
            type="text"
            fullWidth
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
            fullWidth
            label="Image"
            margin="normal"
            value={imageLink}
            onChange={e => setImageLink(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <Button sx={{ mt: 2 }} onClick={e => onUpload(e)}>
            Submit
          </Button>
        </Item>
        <Item sx={{ width: '50%' }}>
          <img src={imageLink} style={{ width: '100%' }} alt="" />
        </Item>
      </Stack>
    </Box>
  );
};

export default NewDish;
