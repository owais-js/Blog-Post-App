import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { useAuth, AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const { logout } = useAuth();
  const { currentuser } = useContext(AuthContext);
  const navigate = useNavigate();

  const displayName = currentuser?.displayName || 'User';

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
    <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
      <Toaster />
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Welcome! {displayName}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Email: {currentuser?.email || "Not available"}
            </Typography>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Actions
            </Typography>

            <Grid container spacing={2} style={{ marginTop: '10px' }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/CreateBlog"
                >
                  Create New Blog
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/MyBlog"
                >
                  View My Blogs
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="default"
                  onClick={handleLogout}
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
