import React, { useContext, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Autocomplete,
  Chip,
  Box,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../Config/FirebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import uploadToCloudinary from '../Config/UploadToCloudinary';
import { blue, grey } from '@mui/material/colors';

const defaultBlogImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmUqy_SZxyRxG5X8EFwFZhxLseYirbZcDzWQ&s";

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const { currentuser } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Creating blog...");

    try {
      const blogimage = selectedImage
        ? await uploadToCloudinary(selectedImage)
        : defaultBlogImage;

      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        tags,
        author: {
          uid: currentuser?.uid,
          email: currentuser?.email,
          name: currentuser?.displayName || "User",
          image: blogimage,
        },
        createdAt: serverTimestamp(),
      });

      toast.dismiss();
      toast.success("Blog created successfully!");
      setTimeout(() => navigate('/blog'), 500);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to create blog. Please try again.");
      console.error('Error creating blog:', error);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: '#ffffff', // Pure white background
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>

      <Toaster />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{
            boxShadow: 3,
            borderRadius: 2,
            p: 2
          }}>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{
                fontWeight: 'bold',
                textAlign: "center",
                color: '#1f4037' // Dark green text
              }}>
                Create New Blog
              </Typography>

              <form onSubmit={handleSubmit}>
                {/* Image Upload */}
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <Avatar
                    src={selectedImage ? URL.createObjectURL(selectedImage) : defaultBlogImage}
                    alt="Blog cover"
                    sx={{ width: 120, height: 120, mx: 'auto' }}
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ mt: 2 }}
                  >
                    Upload Cover Image
                    <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                  </Button>
                </Box>

                {/* Title Field */}
                <TextField
                  label="Blog Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ mb: 3 }}
                  required
                />

                {/* Content Field */}
                <TextField
                  label="Blog Content"
                  multiline
                  minRows={6}
                  fullWidth
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  sx={{ mb: 3 }}
                  required
                />

                {/* Tags Field */}
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={tags}
                  onChange={(event, newValue) => setTags(newValue)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        label={option}
                        {...getTagProps({ index })}
                        sx={{ backgroundColor: '#99f2c8' }} // Light green tags
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" placeholder="Add tags..." />
                  )}
                  sx={{ mb: 3 }}
                />

                {/* Action Buttons */}
                <Box display="flex" justifyContent="space-between">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: '#1f4037', // Dark green
                      '&:hover': { backgroundColor: '#173029' } // Darker green
                    }}
                  >
                    Publish Blog
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/blog')}
                    sx={{ borderColor: grey[500] }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateBlog;  