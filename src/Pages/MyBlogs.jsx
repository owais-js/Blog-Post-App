import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Chip,
} from '@mui/material';
import { db } from '../Config/FirebaseConfig';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const MyBlogs = () => {
  const { currentuser } = useAuth();
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, blogId: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentuser) return;

    const q = query(
      collection(db, 'blogs'),
      where('author.uid', '==', currentuser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedBlogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyBlogs(fetchedBlogs);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
        toast.error('Failed to load blogs');
      }
    );

    return unsubscribe;
  }, [currentuser]);

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  const handleDelete = async () => {
    if (deleteDialog.blogId) {
      setDeleteDialog({ open: false, blogId: null });
      toast.loading('Deleting blog...');

      try {
        await deleteDoc(doc(db, 'blogs', deleteDialog.blogId));
        toast.dismiss();
        toast.success('Blog deleted successfully!');
      } catch (error) {
        toast.dismiss();
        toast.error('Error deleting blog');
        console.error('Error deleting blog:', error);
      }
    }
  };

  const handleRead = (id) => {
    navigate(`/blog/${id}`); 
  };

  return (
    <Container>
      <Toaster />
      <Typography variant="h4" align="center" gutterBottom>
        My Blogs
      </Typography>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress style={{ color: '#1a237e' }} />
        </div>
      ) : (
        <Grid container spacing={4}>
          {myBlogs.length === 0 ? (
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              margin={"200px"}
              style={{ width: '100%' }}
            >
              No blogs to display.
            </Typography>
          ) : (
            myBlogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <Card
                  style={{
                    height: '300px', 
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
<CardContent style={{ flexGrow: 1, overflow: 'hidden' }}>
  <Typography variant="h6">{blog.title}</Typography>
  <Typography variant="body2" color="textSecondary" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
    {blog.content.substring(0, 100)}...
  </Typography>
  <Typography variant="body2" color="secondary">
    Author: {blog?.author?.name}
  </Typography>
  <div style={{ marginTop: '10px' }}>
    {blog.tags && blog.tags.length > 0 ? (
      blog.tags.map((tag, index) => (
        <Chip key={index} label={tag} style={{ margin: '5px' }} />
      ))
    ) : (
      <Typography variant="body2" color="textSecondary">
        No tags available
      </Typography>
    )}
  </div>
</CardContent>


                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(blog.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() =>
                        setDeleteDialog({ open: true, blogId: blog.id })
                      }
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      color="default"
                      onClick={() => handleRead(blog.id)}
                    >
                      Read
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, blogId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, blogId: null })}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyBlogs;
