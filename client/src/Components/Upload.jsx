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
import { uploadXML } from "../API/index.js";

export default function Upload() {
  const [upload, setUpload] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("#49c758");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // shows snackbar
  const showSnackbar = (message, color) => {
    setSnackbarMessage(message);
    if (color) {
      setSnackbarColor(color);
    } else {
      setSnackbarColor("#49c758");
    }
    setSnackbarOpen(true);
  };

  // closes snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleFiles = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (e.target.name === "upload-file") {
      setUpload(file);
      console.log("File uploaded");
      console.log(upload);
      showSnackbar("File uploaded");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // show error if no file uploaded
    if (!upload) {
      showSnackbar("Please upload required files", "red");
      return;
    }
    setLoading(true);

    try {
      await uploadXML(upload);
      console.log(upload);
      setSnackbarMessage("File uploaded");
    } catch (error) {
      showSnackbar("Error processing files", "red");
    } finally {
      setLoading(false);
    }
  };

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
        <Button
          className="new"
          component="label"
          variant="contained"
          startIcon={<CloudUploadRounded />}
        >
          Upload
          <input
            type="file"
            name="upload-file"
            hidden
            onChange={handleFiles}
            accept=".xml"
          />
        </Button>
      </Box>
      <Button
        className="submit"
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        sx={{
          "&.Mui-disabled": {
            backgroundColor: "#5e7889",
            color: "white",
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Submit"
        )}
      </Button>
      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        autoHideDuration={5000}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: snackbarColor,
          },
        }}
      />
    </>
  );
}
