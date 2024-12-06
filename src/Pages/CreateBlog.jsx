import React, { useContext, useState } from 'react';
import { TextField, Button, Grid, Typography, Card, CardContent, Autocomplete, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../Config/FirebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { blue, grey } from '@mui/material/colors';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const { currentuser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Creating blog...");

    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        tags,
        author: {
          uid: currentuser?.uid,
          email: currentuser?.email,
          name: currentuser?.displayName || "User",
        },
        createdAt: serverTimestamp(),
      });

      toast.dismiss();
      toast.success("Blog created successfully!");
      setTimeout(() => {
        navigate('/blog');
      }, 500);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to create blog. Please try again.");
      console.error('Error creating blog:', error);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={{ marginTop: '40px' }}>
      <Toaster />
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold',textAlign:"center" }}>
              Create New Blog
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginBottom: '20px' }}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
              <TextField
                label="Content"
                variant="outlined"
                multiline
                minRows={6}
                maxRows={12}
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ marginBottom: '20px' }}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={tags}
                onChange={(event, newValue) => setTags(newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Tags" variant="outlined" placeholder="Add Tags" />
                )}
                style={{ marginBottom: '20px' }}
              />
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    backgroundColor: blue[500],
                    '&:hover': { backgroundColor: blue[700] },
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    padding: '0.5rem 1.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  Create Blog
                </Button>
                <Button
                  variant="outlined"
                  color="default"
                  onClick={() => navigate('/profile')}
                  sx={{
                    borderColor: grey[500],
                    '&:hover': { borderColor: grey[700], backgroundColor: grey[100] },
                    borderRadius: '4px',
                    padding: '0.5rem 1.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateBlog;
