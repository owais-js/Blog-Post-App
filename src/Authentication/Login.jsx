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
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.loading("Logging in...");
    SetLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.dismiss();
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/blog");
      }, 1000);
    } catch (error) {
      toast.dismiss();
      toast.error("Invalid email or password. Please try again.");
      console.log("Login error:", error);
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
            Login
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#636e72",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Enter your credentials to continue
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={handleLogin}>
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
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Box>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "#636e72" }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#00cec9",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
