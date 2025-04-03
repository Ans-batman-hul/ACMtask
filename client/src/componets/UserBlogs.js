import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogs from "./Blogs";
import { makeStyles } from "@mui/styles";
import config from "../config";

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px auto",
      width: "80%",
      maxWidth: "1000px",
      padding: "20px",
      backgroundColor: "#fafafa",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    },
    blogContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: "0.3s",
      backgroundColor: "#fff",
      '&:hover': {
        transform: "translateY(-5px)",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
      },
    },
    blogImage: {
      width: "100%",
      height: "auto",
      borderRadius: "10px",
      marginBottom: "15px",
      transition: "0.3s",
      '&:hover': {
        opacity: 0.9,
      },
    },
    editButton: {
      background: "linear-gradient(135deg, #1976d2 30%, #1565c0 90%)",
      border: "none",
      padding: "8px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "10px",
      fontSize: "14px",
      color: "white",
      transition: "0.3s",
      '&:hover': {
        background: "#1565c0",
      },
    },
    deleteButton: {
      position: "absolute",
      right: 10,
      top: 10,
      color: "#d32f2f",
      cursor: "pointer",
      transition: "0.3s",
      '&:hover': {
        color: "#b71c1c",
      },
    },
}));


const UserBlogs = () => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return { user: { blogs: [] } };
    }
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  const handleDelete = (blogId) => {
    axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`).then(() => {
      sendRequest().then((data) => setUser(data.user));
    });
  };

  return (
    <div className={classes.container}>
      {user &&
        user.blogs &&
        user.blogs.filter((blog, index, self) => 
          index === self.findIndex((b) => b._id === blog._id)
        ).map((blog) => (
          <div key={blog._id} className={classes.blogContainer}>
            <Blogs
              isUser={true}
            />
            <img
              className={classes.blogImage}
              src={blog.image}
              alt={blog.title}
            />
          </div>
        ))}
    </div>
  );
};

export default UserBlogs;
