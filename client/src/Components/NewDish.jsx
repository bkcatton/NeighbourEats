import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  Paper,
  Typography,
  styled,
} from "@mui/material/";

import { UserContext } from "../Providers/UserProvider";
import axiosConfig from "../axiosConfig";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(6),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const NewDish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [countryStyle, setCountryStyle] = useState("");

  const { user } = useContext(UserContext);
  const { userId } = user;

  const onUpload = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !price ||
      !imageLink ||
      !countryStyle ||
      !userId
    ) {
      return;
    }

    try {
      await axiosConfig.post("/dishes/new", {
        title,
        description,
        price,
        imageLink,
        countryStyle,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
        <Typography variant="h3" sx={{ m: 4 }} textAlign="center">
          What are you making today?
        </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        spacing={2}
      >
        <Item sx={{ width: "50%" }}>
        <Typography variant="h4" color="black" sx={{ mb: 2 }}>
          Create a New Dish!
        </Typography>
          <TextField
            fullWidth
            label="Dish Name"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            variant="standard"
          />
          <FormControl variant="standard" margin="normal" fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
            <Input
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
            onChange={(e) => setCountryStyle(e.target.value)}
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
            onChange={(e) => setImageLink(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <Button sx={{ mt: 2 }} onClick={(e) => onUpload(e)}>
            Submit
          </Button>
        </Item>
        <Item sx={{ width: "50%" }}>
          {/* https://images.unsplash.com/photo-1598134493136-7b63ebbd7b64?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80 */}
          <img src={imageLink} style={{ width: "100%" }} alt="" />
        </Item>
      </Stack>
    </Box>
  );
};

export default NewDish;
