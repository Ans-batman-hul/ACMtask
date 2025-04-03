import React from "react";
import { Button } from "@mui/material"; 
import axios from "axios";
import config from "../config";

const DeleteButton = ({ blogId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      onDelete();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      sx={{
        margin: 1,
        fontWeight: "bold",
        color: "white",
        borderRadius: 10,
        background: "linear-gradient(135deg, #d32f2f 30%, #b71c1c 90%)",
        '&:hover': { background: "#b71c1c" }
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
