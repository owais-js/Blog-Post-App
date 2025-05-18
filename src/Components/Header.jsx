import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Box,
  Container,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  MailOutline,
  ExitToApp,
  Person
} from '@mui/icons-material';
import { AuthContext } from '../Context/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';

const defaultProfilePic = "https://ufrsante.uidt.sn/wp-content/uploads/2023/09/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f4037',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#99f2c8',
      contrastText: '#1f4037'
    }
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h6: {
      fontWeight: 700,
      letterSpacing: 0.5
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: 0.3
    }
  }
});

const Header = () => {
  const { currentuser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    handleMenuClose(); // Close menu before logout
    try {
      toast.loading("Logging out...");
      await logout();
      toast.dismiss();
      toast.success("Logged out successfully!");
      navigate('/');
    } catch (error) {
      toast.dismiss();
      toast.error("Error logging out. Please try again.");
      console.error("Error during logout:", error);
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose(); // Close the menu before navigating
          navigate('/profile');
        }}
      >
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToApp fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => navigate('/blog')}>
        <Typography variant="body2">Explore</Typography>
      </MenuItem>
      <MenuItem onClick={() => navigate('/about')}>
        <Typography variant="body2">About</Typography>
      </MenuItem>
      <MenuItem onClick={() => navigate('/contact')}>
        <Typography variant="body2">Contact</Typography>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Avatar
          alt={currentuser?.displayName || 'User'}
          src={currentuser?.photoURL || defaultProfilePic}
          sx={{ width: 24, height: 24, mr: 1 }}
        />
        <Typography variant="body2">Profile</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            boxShadow: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            height: '80px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ px: { xs: 0, sm: 2 }, height: '100%', minHeight: 'auto' }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  letterSpacing: 1,
                  display: { xs: 'none', sm: 'block' },
                  fontSize: '1.5rem'
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: 'secondary.main',
                    borderBottom: '2px solid',
                    borderColor: 'secondary.main',
                    pb: 0.5
                  }}
                >
                  Premium
                </Box> BlogHub
              </Typography>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                <Button
                  color="inherit"
                  component={Link}
                  to="/blog"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'secondary.main'
                    },
                    px: 2,
                    fontSize: '1rem',
                    height: '50px'
                  }}
                >
                  Explore
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/about"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'secondary.main'
                    },
                    px: 2,
                    fontSize: '1rem',
                    height: '50px'
                  }}
                >
                  About
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/contact"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'secondary.main'
                    },
                    px: 2,
                    fontSize: '1rem',
                    height: '50px'
                  }}
                >
                  Contact
                </Button>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>

                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    alt={currentuser?.displayName || 'User'}
                    src={currentuser?.photoURL || defaultProfilePic}
                    sx={{ width: 40, height: 40 }}
                  />
                </IconButton>
              </Box>

              <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </ThemeProvider>
  );
};

export default Header;
