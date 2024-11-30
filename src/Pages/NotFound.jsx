import React from "react";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
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
            404 - Page Not Found
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 3,
              color: "#555",
            }}
          >
            Sorry, the page you're looking for doesn't exist.
          </Typography>
          <Button
            component={Link}
            to="/"
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
          >
            Go Back to Home
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NotFound;
