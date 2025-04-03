import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import config from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlogs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post(`${config.BASE_URL}/api/blogs/add`, {
        title: inputs.title,
        desc: inputs.description,
        img: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            borderRadius: 4,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: 4,
            margin: "auto",
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            width: { xs: "90%", sm: "70%", md: "50%" },
            backgroundColor: "#ffffff",
            transition: "0.3s",
            '&:hover': { boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)" },
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", paddingBottom: 2, color: "#333" }}
            variant="h4"
            textAlign="center"
          >
            Post Your Blog
          </Typography>
          <InputLabel sx={{ fontWeight: "bold", color: "#555", mb: 1 }}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <InputLabel sx={{ fontWeight: "bold", color: "#555", mb: 1 }}>Description</InputLabel>
          <TextareaAutosize
            name="description"
            onChange={handleChange}
            minRows={10}
            value={inputs.description}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <InputLabel sx={{ fontWeight: "bold", color: "#555", mt: 2, mb: 1 }}>Image URL</InputLabel>
          <TextField
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            sx={{
              mt: 3,
              borderRadius: 2,
              padding: "10px",
              fontSize: "1rem",
              backgroundColor: "#1976d2",
              '&:hover': { backgroundColor: "#1565c0" },
            }}
            variant="contained"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlogs;
