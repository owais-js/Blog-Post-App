import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth, AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

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

const defaultProfilePic =
  "https://ufrsante.uidt.sn/wp-content/uploads/2023/09/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg";

const Profile = () => {
  const { currentuser } = useContext(AuthContext);
  const navigate = useNavigate();

  const displayName = currentuser?.displayName || 'User';
  const userEmail = currentuser?.email || 'Not available';

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
              Your Profile
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
            <CardContent>
              <Grid container justifyContent="center">
                <Avatar
                  alt={currentuser?.displayName || "User"}
                  src={currentuser?.photoURL || defaultProfilePic}
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 4,
                    border: '3px solid',
                    borderColor: 'primary.light'
                  }}
                />
              </Grid>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  textAlign: "center",
                  mb: 3
                }}
              >
                Welcome, {displayName}!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  textAlign: "center",
                  color: "text.secondary",
                  mb: 4
                }}
              >
                Email: {userEmail}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mt: 2,
                  color: "text.primary",
                  textAlign: "center",
                  mb: 4,
                  fontFamily: '"Montserrat", sans-serif'
                }}
              >
                What are you thinking today?
              </Typography>

              <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                <Grid item xs={12} sm={5}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    component={Link}
                    to="/CreateBlog"
                    sx={{
                      py: 1.5,
                      borderRadius: theme.shape.borderRadius,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      }
                    }}
                  >
                    Create New Blog
                  </Button>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    component={Link}
                    to="/MyBlog"
                    sx={{
                      py: 1.5,
                      borderRadius: theme.shape.borderRadius,
                      fontWeight: 600,
                      color: "primary.dark",
                      "&:hover": {
                        backgroundColor: "secondary.dark",
                      }
                    }}
                  >
                    View My Blogs
                  </Button>
                </Grid>
              </Grid>

            </CardContent>
          </Card>
          <Toaster />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
