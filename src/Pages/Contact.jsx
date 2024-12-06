import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e",
    },
    secondary: {
      main: "#ffd700",
    },
    background: {
      default: "#f3f4f6",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: 700,
      marginBottom: "1rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.8,
      color: "#555",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent!");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Typography
          variant="h4"
          align="center"
          color="primary"
          gutterBottom
          fontWeight={700}
        >
          Contact Us
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
              required
              sx={{
                marginBottom: "1rem",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
              required
              type="email"
              sx={{
                marginBottom: "1rem",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              required
              sx={{
                marginBottom: "1.5rem",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                padding: "0.5rem 2rem",
                borderRadius: "8px",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Send Message
            </Button>
          </Box>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default Contact;
