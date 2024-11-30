import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';

// Keyframe animation for smooth fade-down effect
const fadeDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Dashboard = () => {
    const navigate = useNavigate();

    const handleStartBlog = () => {
        navigate('/login');
    };

    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #00c6ff, #0072ff)', // Sky blue gradient
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Text shadow for emphasis
                backgroundSize: 'cover',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Overlay for Glassmorphism */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    zIndex: -1,
                }}
            />

            {/* Main heading with a sleek, glowing effect */}
            <Typography
                variant="h2"
                sx={{
                    fontWeight: '700',
                    color: '#fff',
                    animation: `${fadeDown} 1s ease-out`,
                    marginBottom: '1rem',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textShadow: '0 0 15px rgba(255, 255, 255, 0.8)', // Glowing effect
                    fontFamily: "'Poppins', sans-serif", // Modern font
                    fontSize: { xs: '2rem', sm: '3rem' }, // Responsive text size
                }}
            >
                Welcome to Your Blog Empire!
            </Typography>

            {/* Subheading with a slight opacity for subtlety */}
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.25rem',
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    animation: `${fadeDown} 1s ease-out 0.3s both`,
                    opacity: 0.85,
                    letterSpacing: '1px',
                    fontFamily: "'Lora', serif", // Stylish serif font for contrast
                }}
            >
                Unlock the power of words and share your thoughts with the world. Your story starts here!
            </Typography>

            {/* Stylish Get Started button with gradient and hover effect */}
            <Button
                variant="contained"
                sx={{
                    background: 'linear-gradient(90deg, #00c6ff, #0072ff)', // Soft blue gradient for the button
                    color: '#fff',
                    padding: '14px 40px',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    borderRadius: '50px', // Round corners for a more modern look
                    textTransform: 'uppercase', // Uppercase text on button
                    boxShadow: '0px 12px 18px rgba(0, 114, 255, 0.6)', // Soft shadow for depth
                    animation: `${fadeDown} 1s ease-out 0.6s both`,
                    transition: 'all 0.3s ease-out', // Smooth transition on hover
                    '&:hover': {
                        background: 'linear-gradient(90deg, #0072ff, #00c6ff)',
                        boxShadow: '0px 16px 25px rgba(0, 114, 255, 0.7)', // Enhanced shadow effect on hover
                        transform: 'scale(1.05)', // Slight scale effect on hover
                    },
                    '&:active': {
                        transform: 'scale(1)', // Smooth transition back to normal size
                    },
                }}
                onClick={handleStartBlog}
            >
                Get Started
            </Button>
        </Box>
    );
};

export default Dashboard;
