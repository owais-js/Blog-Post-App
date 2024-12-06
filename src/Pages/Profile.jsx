import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import { useAuth, AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { blue, purple, grey } from '@mui/material/colors';

const Profile = () => {
  const { logout } = useAuth();
  const { currentuser } = useContext(AuthContext);
  const navigate = useNavigate();

  const displayName = currentuser?.displayName || 'User';
  const userEmail = currentuser?.email || 'Not available';

  const handleLogout = async () => {
    try {
      toast.loading("Logging out...");
      await setTimeout(async () => {
        await logout();
      }, 500);
      toast.dismiss();
      toast.success("Logged out successfully!");
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      toast.dismiss();
      toast.error("Error logging out. Please try again.");
      console.error("Error during logout:", error);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={{ marginTop: '30px' }}>
      <Toaster />
      <Grid item xs={12} sm={8} md={6}>
        <Card variant="outlined" sx={{ boxShadow: 3 }}>
          <CardContent>
            <Grid container justifyContent="center">
              <Avatar 
                alt={displayName} 
                src="/path/to/profile-image.jpg" 
                sx={{ width: 80, height: 80, marginBottom: 2 }} 
              />
            </Grid>
            <Typography variant="h4" gutterBottom color="primary.main" sx={{ fontWeight: 'bold',textAlign:"center"}}>
              Welcome, {displayName}!
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.1rem',textAlign:"center" }}>
              Email: {userEmail}
            </Typography>

            <Typography variant="h6" sx={{ marginTop: '20px', color: grey[800],textAlign:"center" }}>
              What are you thinking today?
            </Typography>

            <Grid container spacing={2} style={{ marginTop: '20px' }}>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  to="/CreateBlog"
                  sx={{ backgroundColor: blue[500], '&:hover': { backgroundColor: blue[700] } }}
                >
                  Create New Blog
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  component={Link}
                  to="/MyBlog"
                  sx={{ backgroundColor: purple[500], '&:hover': { backgroundColor: purple[700] } }}
                >
                  View My Blogs
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={handleLogout}
                  sx={{
                    borderColor: grey[500],
                    '&:hover': { borderColor: grey[700], backgroundColor: grey[100] },
                  }}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
