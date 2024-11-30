import React from "react";
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Avatar,
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
    },
});

function About() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                    <Typography variant="h4" align="center" color="#263238" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        Welcome to our VIP Blog Platform. Here, we aim to empower voices, share stories, and connect individuals through the art of blogging.
                    </Typography>

                    <Grid container spacing={4} style={{ marginTop: "3rem" }}>
                        <Grid item xs={12} md={6}>
                            <Card
                                style={{
                                    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                                    borderRadius: "15px",
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" color="#263238" gutterBottom>
                                        Our Mission
                                    </Typography>
                                    <Typography variant="body1">
                                        To create a premium blogging platform where creativity, knowledge, and inspiration thrive, connecting authors and readers worldwide.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card
                                style={{
                                    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                                    borderRadius: "15px",
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" color="#263238" gutterBottom>
                                        Our Vision
                                    </Typography>
                                    <Typography variant="body1">
                                        To become the go-to platform for high-quality, diverse, and impactful blogs that inspire and resonate with a global audience.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Box style={{ marginTop: "4rem" }}>
                        <Typography variant="h4" align="center" color="#263238" gutterBottom>
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
                                            style={{
                                                textAlign: "center",
                                                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                                                borderRadius: "15px",
                                            }}
                                        >
                                            <CardContent>
                                                <Avatar
                                                    src={member.image}
                                                    alt={member.name}
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                        margin: "0 auto 1rem",
                                                    }}
                                                />
                                                <Typography variant="h6" color="#263238">
                                                    {member.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {member.role}
                                                </Typography>
                                            </CardContent>
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
