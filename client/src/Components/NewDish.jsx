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
  CardMedia,
  FormHelperText,
  styled,
} from "@mui/material/";
import { LoadingButton } from "@mui/lab";

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

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
      setFailed(true);
      return;
    }

    setLoading(true);

    try {
      const data = await axiosConfig.post("/dishes/new", {
        title,
        description,
        price: price * 100,
        imageLink,
        countryStyle,
        userId,
      });

      if (!data) {
        return;
      }
      // simulate form submission loading and success states
      setTimeout(() => {
        setLoading(false);

        setTimeout(() => {
          setSuccess(true);

          setTitle("");
          setDescription("");
          setPrice("");
          setImageLink("");
          setCountryStyle("");
        }, 1000);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ m: 4 }} textAlign="center">
        What are you making today?
      </Typography>
      <Stack direction="row" justifyContent="space-around" spacing={2}>
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
            error={failed && !title}
            helperText={failed && !title ? "Title is required" : " "}
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
            error={failed && !description}
            helperText={
              failed && !description ? "Description is required" : " "
            }
          />
          <FormControl
            variant="standard"
            error={failed && !price}
            margin="normal"
            fullWidth
          >
            <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
            <Input
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
            {failed && !price ? (
              <FormHelperText>Price is required</FormHelperText>
            ) : (
              <FormHelperText> </FormHelperText>
            )}
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
            error={failed && !countryStyle}
            helperText={failed && !countryStyle ? "Country is required" : " "}
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
            error={failed && !imageLink}
            helperText={failed && !imageLink ? "Image is required" : " "}
          />
          {!loading && !success && (
            <Button
              sx={{ mt: 2 }}
              onClick={(e) => onUpload(e)}
              fullWidth
              variant="contained"
            >
              Upload New Dish
            </Button>
          )}
          {loading && (
            <LoadingButton sx={{ mt: 2 }} variant="outlined" fullWidth>
              Uploading...
            </LoadingButton>
          )}
          {success && (
            <Button sx={{ mt: 2 }} variant="contained" fullWidth>
              Successfully Uploaded!
            </Button>
          )}
        </Item>
        <Item sx={{ width: "50%", display: "flex" }}>
          {!imageLink ? (
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1598134493136-7b63ebbd7b64?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
              alt="dog"
            />
          ) : (
            <CardMedia component="img" image={imageLink} alt="dog" />
          )}
        </Item>
      </Stack>
    </Box>
  );
};

export default NewDish;
