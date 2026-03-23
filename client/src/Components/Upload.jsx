import { useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  CircularProgress,
  Slide,
  colors,
} from "@mui/material";
import { CloudUploadRounded } from "@mui/icons-material";

export default function Upload() {
  return (
    <>
      <h1 className="title">XML Upload</h1>
      <Box className="uploads">
        <p>Drag and drop to upload XML file or click upload button</p>
      </Box>
      <Box
        className="file-upload"
        sx={{
          border: "2px dashed #ccc",
          borderRadius: 2,
          padding: 4,
          margin: 1,
          textAlign: "center",
          position: "relative",
          "&:hover": {
            borderColor: "#888",
          },
        }}
      >
        <Button className="new" component="label" variant="contained">
          Upload
        </Button>
      </Box>
    </>
  );
}
