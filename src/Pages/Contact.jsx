import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1f4037",
      light: "#99f2c8",
      dark: "#173029",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#f8b400",
      contrastText: "#1f4037"
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff"
    },
    text: {
      primary: "#1f4037",
      secondary: "#5a6d62"
    }
  },
  typography: {
    fontFamily: [
      '"Playfair Display"',
      '"Montserrat"',
      'serif'
    ].join(','),
    h4: {
      fontWeight: 700,
      letterSpacing: 0.5,
      lineHeight: 1.3
    },
    h5: {
      fontWeight: 600,
      fontFamily: '"Montserrat", sans-serif'
    },
    body1: {
      fontFamily: '"Montserrat", sans-serif',
      lineHeight: 1.8
    },
    body2: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "0.95rem",
      lineHeight: 1.7
    },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      letterSpacing: 0.5
    }
  },
  shape: {
    borderRadius: 16
  },
  shadows: [
    "none",
    "0 2px 8px rgba(31, 64, 55, 0.08)",
    "0 4px 12px rgba(31, 64, 55, 0.1)",
    ...Array(22).fill("none")
  ]
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
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          py: { xs: 4, md: 8 }
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 4 } }}>
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 6 },
              position: "relative"
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                mb: 2,
                position: "relative",
                display: "inline-block",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 80,
                  height: 4,
                  background: "primary.light",
                  borderRadius: 2
                }
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 700,
                mx: "auto",
                color: "text.secondary",
                mt: 3
              }}
            >
              Have questions or feedback? We'd love to hear from you.
            </Typography>
          </Box>

          <Card
            sx={{
              p: { xs: 3, md: 5 },
              border: '1px solid',
              borderColor: 'primary.light',
              position: 'relative',
              maxWidth: 700,
              mx: "auto",
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none'
              }
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="column"
                gap={3}
              >
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required

                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  type="email"

                />
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: theme.shape.borderRadius,
                    fontWeight: 600,
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                    mt: 2
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </form>
          </Card>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Alternatively, you can reach us at: contact@vipblog.com
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Contact;