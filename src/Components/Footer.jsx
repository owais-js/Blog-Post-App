import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Divider, 
  Grid, 
  Link as MuiLink,
  IconButton
} from '@mui/material';
import { 
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    body2: {
      fontSize: '0.875rem'
    }
  }
});

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          py: 6,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          mt: 'auto'
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    color: 'secondary.main',
                    borderBottom: '2px solid',
                    borderColor: 'secondary.main',
                    pb: 0.5,
                    mr: 1
                  }}
                >
                  Premium
                </Box> BlogHub
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Elevating your reading experience with premium content and expert insights.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton 
                  sx={{ 
                    color: 'primary.contrastText',
                    '&:hover': {
                      color: 'secondary.main',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: 'primary.contrastText',
                    '&:hover': {
                      color: 'secondary.main',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <Twitter />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: 'primary.contrastText',
                    '&:hover': {
                      color: 'secondary.main',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: 'primary.contrastText',
                    '&:hover': {
                      color: 'secondary.main',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Company
              </Typography>
              <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                <Typography variant="body2">About Us</Typography>
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                <Typography variant="body2">Careers</Typography>
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                <Typography variant="body2">Press</Typography>
              </MuiLink>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Resources
              </Typography>
              <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                <Typography variant="body2">Blog</Typography>
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                <Typography variant="body2">Help Center</Typography>
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                <Typography variant="body2">Tutorials</Typography>
              </MuiLink>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Legal
              </Typography>
              <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                <Typography variant="body2">Privacy Policy</Typography>
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                <Typography variant="body2">Terms of Service</Typography>
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                <Typography variant="body2">Cookie Policy</Typography>
              </MuiLink>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>hello@bloghub.com</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>+1 (555) 123-4567</Typography>
              <Typography variant="body2">123 Premium Street, Suite 100</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Premium BlogHub. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;