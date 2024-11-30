import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Config/FirebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [fullname, SetFullname] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    toast.loading("Signing up!");
    e.preventDefault();
    SetLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: fullname,
      });
      toast.dismiss();
      toast.success("Signup successful!");
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      toast.error("Error signing up. Please try again.");
      console.log("Error Signing up: ", error);
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
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: "#1f4037",
            }}
          >
            Create Your Account
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 3,
              color: "#555",
            }}
          >
            Sign up to start posting and managing your blogs
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignup}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={fullname}
              onChange={(e) => SetFullname(e.target.value)}
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "#555" }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#1f4037",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
