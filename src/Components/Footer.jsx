import React from 'react';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: '2rem',
        backgroundColor: '#263238', 
        padding: '1rem 0',
        textAlign: 'center',
        color: '#ECEFF1', 
      }}
    >
      <Typography variant="body2" color="inherit">
        © 2024 BlogApp | All Rights Reserved
      </Typography>
    </footer>
  );
};

export default Footer;
