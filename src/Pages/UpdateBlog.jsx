import React, { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../Config/FirebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { blue, grey } from '@mui/material/colors';
import uploadToCloudinary from '../Config/UploadToCloudinary';

const UpdateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [author, setAuthor] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(db, 'blogs', id);
        const blogSnap = await getDoc(blogRef);
        if (blogSnap.exists()) {
          const blogData = blogSnap.data();
          setTitle(blogData.title);
          setContent(blogData.content);
          setTags(blogData.tags || []);
          setCurrentImage(blogData.author?.image || null);
          setAuthor(blogData.author || {});
        } else {
          toast.error('Blog not found');
          navigate('/Myblog');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to load blog data');
        navigate('/blog');
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading('Updating blog...');

    try {
      let updatedImage = currentImage;

      if (selectedImage) {
        updatedImage = await uploadToCloudinary(selectedImage);
      }

      const updatedBlogData = {
        title,
        content,
        tags,
        author: {
          ...author,
          image: updatedImage,
        },
        Edited: true,
      };

      const blogRef = doc(db, 'blogs', id);
      await updateDoc(blogRef, updatedBlogData);
      toast.dismiss();
      toast.success('Blog updated successfully!');
      setTimeout(() => {
        navigate('/Myblog');
      }, 500);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to update the blog.');
      console.error('Error updating blog:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#ffffff', // Pure white background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Toaster />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#1f4037', // Dark green text
                }}
              >
                Update Blog
              </Typography>

              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <Avatar
                    src={selectedImage ? URL.createObjectURL(selectedImage) : currentImage}
                    alt="Blog Image"
                    sx={{ width: 120, height: 120, mx: 'auto' }}
                  />
                  <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                    Upload New Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                    />
                  </Button>
                </Box>

                <TextField
                  label="Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ mb: 3 }}
                  required
                />

                <TextField
                  label="Content"
                  multiline
                  minRows={6}
                  fullWidth
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  sx={{ mb: 3 }}
                  required
                />

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

                <Box display="flex" justifyContent="space-between">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: '#1f4037', // Dark green
                      '&:hover': { backgroundColor: '#173029' }, // Darker green
                    }}
                  >
                    Update Blog
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/Myblog')}
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

export default UpdateBlog;
