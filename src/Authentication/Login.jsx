import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../Config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    SetLoading(true);
    toast.loading("Logging in...");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.dismiss();
      toast.success("Login successful!");
      setTimeout(() => {
        navigate('/blog');
      }, 500);
    } catch (error) {
      toast.dismiss();
      toast.error("Login failed. Please check your credentials.");
      console.log("Error logging in: ", error);
    } finally {
      SetLoading(false);
    }
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        background: "linear-gradient(to bottom, #1f4037, #99f2c8)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Toaster />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={10}
        sx={{
          borderRadius: 4,
          p: 4,
          background: "#ffffff",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: "#1f4037",
            }}
          >
            Login to Your Account
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 3,
              color: "#555",
            }}
          >
            Enter your credentials to access your blogs
          </Typography>
          <Box component="form" noValidate onSubmit={handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              sx={{
                background: "#f0f0f0",
                borderRadius: 2,
                "& fieldset": { border: "none" },
                "&:hover": {
                  background: "#f1f1f1",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              sx={{
                background: "#f0f0f0",
                borderRadius: 2,
                "& fieldset": { border: "none" },
                "&:hover": {
                  background: "#f1f1f1",
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#1f4037",
                "&:hover": {
                  backgroundColor: "#1b3b32",
                },
                color: "#fff",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "#555" }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#1f4037",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
