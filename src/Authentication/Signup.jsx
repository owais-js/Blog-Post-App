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
  const [fullname, SetFullname] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
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
        navigate("/login");
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
        background: "linear-gradient(135deg, #2d3436, #00cec9)",
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
        elevation={8}
        sx={{
          borderRadius: 6,
          p: 4,
          background: "#ffffff",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#2d3436",
              mb: 1,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Sign Up
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#636e72",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Join us and start your blogging journey
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={handleSignup}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            value={fullname}
            onChange={(e) => SetFullname(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#00cec9",
              py: 1.5,
              borderRadius: 8,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#01a3a4",
              },
            }}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </Box>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "#636e72" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#00cec9",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Signup;
