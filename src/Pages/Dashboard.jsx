import React from "react";
import { Button, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

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
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: "#1f4037",
            textAlign: "center",
          }}
        >
          Welcome to Your Blog Hub!
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 3,
            color: "#555",
            textAlign: "center",
          }}
        >
          Share your ideas and inspire the world.
        </Typography>
        <Button
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
            px: 4,
            py: 1.5,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
