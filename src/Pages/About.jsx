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
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
});

function About() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Welcome to our VIP Blog Platform. Here, we aim to empower voices, share stories, and connect individuals through the art of blogging.
          </Typography>

          <Grid container spacing={4} style={{ marginTop: "3rem" }}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    To create a premium blogging platform where creativity, knowledge, and inspiration thrive, connecting authors and readers worldwide.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    Our Vision
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    To become the go-to platform for high-quality, diverse, and impactful blogs that inspire and resonate with a global audience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box style={{ marginTop: "4rem" }}>
            <Typography variant="h4" align="center" color="primary" gutterBottom>
              Meet Our Team
            </Typography>
            <Typography variant="body1" align="center" style={{ marginBottom: "2rem" }}>
              Our passionate team of writers, developers, and designers is dedicated to delivering a superior blogging experience.
            </Typography>
            <Grid container spacing={4}>
              {[{ name: "Owais", role: "Founder & CEO", image: "/images/alice.jpg" },
                { name: "Uzair", role: "Lead Developer", image: "/images/john.jpg" },
                { name: "Samad", role: "Content Strategist", image: "/images/emma.jpg" }]
                .map((member, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                        "&:hover": {
                          transform: "scale(1.05)",
                          transition: "transform 0.3s ease-in-out",
                        },
                      }}
                    >
                      <CardContent style={{ textAlign: "center" }}>
                        <Avatar
                          src={member.image}
                          alt={member.name}
                          sx={{
                            width: 100,
                            height: 100,
                            margin: "0 auto 1rem",
                          }}
                        />
                        <Typography variant="h6" color="primary">
                          {member.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {member.role}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          sx={{
                            fontWeight: 600,
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                            "&:hover": {
                              backgroundColor: theme.palette.primary.dark,
                            },
                          }}
                        >
                          Contact
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default About;
