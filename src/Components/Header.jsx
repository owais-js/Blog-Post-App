import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { AuthContext } from '../Context/AuthContext';
import { Avatar } from '@mui/material';
const defaultProfilePic =
  "https://ufrsante.uidt.sn/wp-content/uploads/2023/09/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg";


const Header = () => {
  const { currentuser } = useContext(AuthContext);  
  
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
          <IconButton>
            <Avatar
              alt={currentuser?.displayName || 'User'}
              src={currentuser?.photoURL || defaultProfilePic}
            />
          </IconButton>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;