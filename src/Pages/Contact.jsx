import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1a237e",
        },
        secondary: {
            main: "#ffd700",
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
    },
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
            <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <Typography variant="h4" align="center" color="#263238" gutterBottom>
                    Contact Us
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        style={{ maxWidth: "500px", margin: "0 auto" }}
                    >
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
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
                            margin="normal"
                            multiline
                            rows={4}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ marginTop: "1rem", backgroundColor: "#263238", color: "white" }}
                        >
                            Send Message
                        </Button>
                    </Box>
                </form>
            </Container>
        </ThemeProvider>
    );
};

export default Contact;
