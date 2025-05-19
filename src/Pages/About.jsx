import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

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

function About() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          py: { xs: 4, md: 8 }
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 8 },
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
              About Our Platform
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
              Welcome to our premium blogging platform where creativity meets inspiration.
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  boxShadow: 2,
                  borderRadius: theme.shape.borderRadius,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 3,
                  },
                  border: "none",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ flex: 1, p: 3, textAlign: 'center' }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    To create a premium blogging platform where creativity, knowledge, and inspiration thrive, connecting authors and readers worldwide.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  boxShadow: 2,
                  borderRadius: theme.shape.borderRadius,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 3,
                  },
                  border: "none",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ flex: 1, p: 3, textAlign: 'center' }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    Our Vision
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    To become the go-to platform for high-quality, diverse, and impactful blogs that inspire and resonate with a global audience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h4"
              align="center"
              color="primary"
              gutterBottom
              sx={{
                position: "relative",
                display: "inline-block",
                width: "100%",
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
              Meet Our Team
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                maxWidth: 700,
                mx: "auto",
                color: "text.secondary",
                mt: 3,
                mb: 6
              }}
            >
              Our passionate team of writers, developers, and designers is dedicated to delivering a superior blogging experience.
            </Typography>
            <Grid container spacing={4}>
              {[
                { name: "Owais", role: "Founder & CEO", image: "/images/alice.jpg" },
                { name: "Mudasir", role: "Lead Developer", image: "/images/john.jpg" },
                { name: "Hamza", role: "Content Strategist", image: "/images/emma.jpg" }
              ].map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      boxShadow: 2000,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 10,
                      },
                      border: "none",
                      overflow: "hidden",
                      p: 3
                    }}
                  >
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: 120,
                        height: 120,
                        mb: 3,
                        border: "3px solid",
                        borderColor: "primary.light"
                      }}
                    />
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {member.role}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        fontWeight: 600,
                        borderRadius: theme.shape.borderRadius,
                        px: 4,
                        py: 1,
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      }}
                    >
                      Contact
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default About;
