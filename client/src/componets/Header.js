import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: false } });
  };

  const handleSignupClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: true } });
  };

  return (
    <AppBar position="sticky" sx={{ background: "linear-gradient(135deg, #1976d2 30%, #1565c0 90%)", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }}>
      <Toolbar>
        {isLoggedIn && (
          <Box display="flex" marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              sx={{ '& .MuiTabs-indicator': { backgroundColor: "#ff9800" } }}
            >
              <Tab
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
                sx={{ fontWeight: "bold", textTransform: "none" }}
              />
              <Tab
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
                sx={{ fontWeight: "bold", textTransform: "none" }}
              />
              <Tab
                LinkComponent={Link}
                to="/blogs/add"
                label="Add Blog"
                sx={{ fontWeight: "bold", textTransform: "none" }}
              />
            </Tabs>
          </Box>
        )}
        <Typography variant="h4" sx={{ 
          fontWeight: "bold", 
          letterSpacing: "1px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)"
        }}>
          BlogShul
        </Typography>
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                onClick={handleLoginClick}
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #1976d2 30%, #1565c0 90%)",
                  '&:hover': { background: "#1565c0" }
                }}
              >
                Login
              </Button>
              <Button
                onClick={handleSignupClick}
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #ff9800 30%, #ff5722 90%)",
                  '&:hover': { background: "#ff5722" }
                }}
              >
                SignUp
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{
                margin: 1,
                borderRadius: 10,
                background: "linear-gradient(135deg, #f57c00 30%, #e65100 90%)",
                color: "white",
                '&:hover': { background: "#e65100" }
              }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
