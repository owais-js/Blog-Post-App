import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#263238',
        color: '#ECEFF1',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          Blog Post App
        </Typography>
        <Button
          sx={{
            color: '#ECEFF1', 
            '&:hover': { backgroundColor: '#455A64' }, 
            fontWeight: '500',
          }}
          component={Link}
          to="/blog"
        >
          Explore
        </Button>
        <Button
          sx={{
            color: '#ECEFF1', 
            '&:hover': { backgroundColor: '#455A64' }, 
            fontWeight: '500',
          }}
          component={Link}
          to="/about"
        >
          About
        </Button>
        <Button
          sx={{
            color: '#ECEFF1', 
            '&:hover': { backgroundColor: '#455A64' }, 
            fontWeight: '500',
          }}
          component={Link}
          to="/contact"
        >
          Contact
        </Button>

        <IconButton
          sx={{
            color: '#ECEFF1',
            '&:hover': { backgroundColor: '#455A64' }, 
          }}
          component={Link}
          to="/profile"
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
