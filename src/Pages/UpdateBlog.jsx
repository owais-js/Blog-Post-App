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
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../Config/FirebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';

const UpdateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.loading('Updating blog...');

        const updatedBlogData = {
            title,
            content,
            tags,
            Edited: true,
        };

        try {
            const blogRef = doc(db, 'blogs', id);
            await updateDoc(blogRef, updatedBlogData);
            toast.dismiss();
            toast.success('Blog updated successfully!');
            setTimeout(() => {
                navigate('/Myblog');
              },500);
        } catch (error) {
            toast.dismiss();
            toast.error('Failed to update the blog.');
            console.error('Error updating blog:', error);
        }
    };

    return (
        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
            <Toaster />
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Update Blog
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ marginBottom: '20px' }}
                            />
                            <TextField
                                label="Content"
                                variant="outlined"
                                multiline
                                minRows={6}
                                fullWidth
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ marginBottom: '20px' }}
                            />
                            <Autocomplete
                                multiple
                                freeSolo
                                id="tags"
                                options={[]}
                                value={tags}
                                onChange={(event, newValue) => setTags(newValue)}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            key={option}
                                            variant="outlined"
                                            label={option}
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="Tags" variant="outlined" />
                                )}
                                style={{ marginBottom: '20px' }}
                            />

                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" type="submit">
                                        Update Blog
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        color="default"
                                        onClick={() => navigate('/blog')}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UpdateBlog;
