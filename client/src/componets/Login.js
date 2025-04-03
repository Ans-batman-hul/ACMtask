import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config";

const Login = () => {
  const location = useLocation();
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const { isSignupButtonPressed } = location.state || {};

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(isSignupButtonPressed || false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    setIsSignup(isSignupButtonPressed);
  }, [isSignupButtonPressed]);
  
  const sendRequest = async (type = "login") => {
    console.log("inside send req");
    console.log(`${config.BASE_URL}/api/users/${type}`);
        const res = await axios.post(`${config.BASE_URL}/api/users/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
        });
        
        if (res && res.data) {
            return res.data;
        } else {
            throw new Error("Invalid response");
        }
  };

  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => {
            localStorage.setItem("userId", data.user._id);
            dispath(authActions.login());
            naviagte("/blogs");
        })
        .catch(err => {
            setError(err.response?.data?.message || "Signup failed");
        });
    } else {
      sendRequest()
        .then((data) => {
            localStorage.setItem("userId", data.user._id);
            dispath(authActions.login());
            naviagte("/blogs");
        })
        .catch(err => {
            setError(err.response?.data?.message || "Login failed");
        });
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && (
          <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box
          sx={{
            maxWidth: 420,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            padding: 4,
            margin: "auto",
            marginTop: 6,
            borderRadius: 4,
            backgroundColor: "#ffffff",
            transition: "0.3s",
            '&:hover': { boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.3)" },
          }}
        >
          <Typography
            variant="h3"
            padding={2}
            textAlign="center"
            fontWeight="bold"
            color="#333"
          >
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
              fullWidth
              sx={{ borderRadius: 2, backgroundColor: "#f5f5f5" }}
            />
          )} 
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type="email"
            placeholder="Email"
            margin="normal"
            fullWidth
            sx={{ borderRadius: 2, backgroundColor: "#f5f5f5" }}
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            placeholder="Password"
            margin="normal"
            fullWidth
            sx={{ borderRadius: 2, backgroundColor: "#f5f5f5" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 3,
              marginTop: 3,
              padding: "10px 20px",
              fontSize: "1rem",
              background: "linear-gradient(135deg, #ff9800 30%, #ff5722 90%)",
              color: "white",
              '&:hover': { background: "#ff5722" },
            }}
            fullWidth
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{
              borderRadius: 3,
              marginTop: 3,
              padding: "10px 20px",
              fontSize: "0.9rem",
              color: "#1976d2",
              '&:hover': { textDecoration: "underline" },
            }}
            fullWidth
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
