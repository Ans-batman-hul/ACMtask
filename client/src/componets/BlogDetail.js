import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`${config.BASE_URL}/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`${config.BASE_URL}/api/blogs/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              border: "3px solid",
              borderImage: "linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%) 1",
              borderRadius: 4,
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              padding: 4,
              margin: "auto",
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              width: { xs: "90%", sm: "70%", md: "50%" },
              backgroundColor: "#ffffff",
              transition: "0.3s",
              '&:hover': { boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.3)" },
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
            <TextField
              name="description"
              onChange={handleChange}
              minRows={8}
              value={inputs.description}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                fontFamily: "Arial, sans-serif",
              }}
            />
            <Button
              sx={{
                mt: 3,
                borderRadius: 2,
                padding: "12px",
                fontSize: "1rem",
                background: "linear-gradient(135deg, #ff9800 30%, #ff5722 90%)",
                color: "white",
                '&:hover': { background: "linear-gradient(135deg, #ff5722 30%, #d84315 90%)" },
              }}
              variant="contained"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </Box>
      </form>      
      )}
    </div>
  );
};

export default BlogDetail;
