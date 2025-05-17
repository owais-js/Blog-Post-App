import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Config/FirebaseConfig";
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Box,
  IconButton,
  CardMedia,
  Divider,
  Avatar,
  Button,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  ThumbUp,
  ThumbUpOutlined,
  Bookmark,
  BookmarkBorder,
  Share,
  Edit,
  Comment,
  RemoveRedEye,
  NavigateNext
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { format } from 'date-fns';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1f4037",
      light: "#99f2c8",
      dark: "#173029",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#f8b400",
      contrastText: "#1f4037"
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff"
    },
    text: {
      primary: "#1f4037",
      secondary: "#5a6d62"
    }
  },
  typography: {
    fontFamily: [
      '"Playfair Display"',
      '"Montserrat"',
      'serif'
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.3,
      letterSpacing: 0.5
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.8rem",
      fontFamily: '"Montserrat", sans-serif'
    },
    body1: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "1.1rem",
      lineHeight: 1.8
    },
    subtitle1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      color: "#5a6d62"
    }
  },
  shape: {
    borderRadius: 16
  }
});

function BlogDetails() {
  const { id } = useParams();
  const { currentuser } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogDoc = doc(db, "blogs", id);
        const blogSnapshot = await getDoc(blogDoc);

        if (blogSnapshot.exists()) {
          const blogData = blogSnapshot.data();
          setBlog({ id: blogSnapshot.id, ...blogData });
          setLikes(blogData.likes || 0);
          setViews(blogData.views || 0);
          if (currentuser) {
            setHasLiked(blogData.likedBy?.includes(currentuser.uid));
            setSaved(blogData.savedBy?.includes(currentuser.uid));
          }


          await updateDoc(blogDoc, {
            views: (blogData.views || 0) + 1
          });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id, currentuser]);

  const handleLike = async () => {
    if (!currentuser) return;

    try {
      const blogDoc = doc(db, "blogs", id);
      const newLikes = hasLiked ? likes - 1 : likes + 1;

      setLikes(newLikes);
      setHasLiked(!hasLiked);

      await updateDoc(blogDoc, {
        likes: newLikes,
        likedBy: hasLiked
          ? arrayRemove(currentuser.uid)
          : arrayUnion(currentuser.uid)
      });
    } catch (error) {
      console.error("Error updating like:", error);
      setLikes(hasLiked ? likes + 1 : likes - 1);
      setHasLiked(!hasLiked);
    }
  };

  const handleSave = async () => {
    if (!currentuser) return;

    try {
      const blogDoc = doc(db, "blogs", id);
      const newSaved = !saved;

      setSaved(newSaved);

      await updateDoc(blogDoc, {
        savedBy: newSaved
          ? arrayUnion(currentuser.uid)
          : arrayRemove(currentuser.uid)
      });
    } catch (error) {
      console.error("Error updating save:", error);
      setSaved(!saved);
    }
  };

  const handleShare = () => {
    setShareDialog(true);
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: `Check out this blog: ${blog.title}`,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    }
  };

  const formatDate = (date) => {
    return date ? format(date.toDate(), 'MMMM dd, yyyy') : '';
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          backgroundColor: theme.palette.background.default
        }}>
          <CircularProgress size={60} thickness={4} sx={{ color: theme.palette.primary.main }} />
        </Box>
      </ThemeProvider>
    );
  }

  if (!blog) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          backgroundColor: theme.palette.background.default
        }}>
          <Typography variant="h2" color="error">
            Blog not found
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundColor: theme.palette.background.default,
        py: 6,
        minHeight: '100vh'
      }}>
        <Container maxWidth="lg">

          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 4 }}
          >
            <Link color="inherit" href="/" underline="hover">
              Home
            </Link>
            <Link color="inherit" href="/blog" underline="hover">
              Blogs
            </Link>
            <Typography color="text.primary">{blog.title}</Typography>
          </Breadcrumbs>

          {/* Main Content */}
          <Card sx={{
            borderRadius: 4,
            boxShadow: 3,
            overflow: 'hidden',
            mb: 6
          }}>
            {/* Cover Image */}
            <Box sx={{
              position: 'relative',
              height: { xs: 300, md: 500 },
              overflow: 'hidden'
            }}>
              <CardMedia
                component="img"
                image={blog?.imageUrl || blog?.author?.image || "https://source.unsplash.com/random/1200x600/?blog,writing"}
                alt={blog.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
              {blog.premium && (
                <Chip
                  label="PREMIUM"
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    backgroundColor: 'secondary.main',
                    color: 'primary.dark',
                    fontWeight: 700,
                    boxShadow: 2
                  }}
                />
              )}
            </Box>

            {/* Blog Content */}
            <CardContent sx={{ px: { xs: 3, md: 6 }, py: 5 }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4
              }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Published on {formatDate(blog.createdAt)}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={handleShare} sx={{ color: 'text.secondary' }}>
                    <Share />
                  </IconButton>
                  <IconButton
                    onClick={handleSave}
                    sx={{ color: saved ? 'secondary.main' : 'text.secondary' }}
                  >
                    {saved ? <Bookmark /> : <BookmarkBorder />}
                  </IconButton>
                </Box>
              </Box>

              <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
                {blog.title}
              </Typography>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 5
              }}>
                <Avatar
                  src={blog?.author?.image}
                  alt={blog?.author?.name}
                  sx={{
                    width: 56,
                    height: 56,
                    mr: 2,
                    border: '2px solid',
                    borderColor: 'primary.light'
                  }}
                />
                <Box>
                  <Typography variant="h6" component="div">
                    {blog?.author?.name || "Unknown Author"}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {blog?.author?.role || "Content Creator"}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Typography variant="body1" sx={{
                whiteSpace: 'pre-line',
                mb: 4,
                '& p': {
                  mb: 3
                },
                '& h2, & h3': {
                  mt: 4,
                  mb: 2,
                  color: 'primary.main'
                }
              }}>
                {blog.content}
              </Typography>

              {blog.tags && blog.tags.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Tags:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {blog.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        variant="outlined"
                        sx={{
                          borderColor: 'primary.light',
                          color: 'text.primary',
                          '&:hover': {
                            backgroundColor: 'primary.light'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 4 }} />

              {/* Engagement Section */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button
                    variant={hasLiked ? "contained" : "outlined"}
                    startIcon={hasLiked ? <ThumbUp /> : <ThumbUpOutlined />}
                    onClick={handleLike}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      backgroundColor: hasLiked ? 'primary.main' : 'transparent',
                      '&:hover': {
                        backgroundColor: hasLiked ? 'primary.dark' : 'action.hover'
                      }
                    }}
                  >
                    {likes} {likes === 1 ? 'Like' : 'Likes'}
                  </Button>

                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <RemoveRedEye fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {views} views
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <Comment fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {blog.comments || 0} comments
                    </Typography>
                  </Box>
                </Box>

                {currentuser?.uid === blog?.author?.uid && (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    href={`/edit-blog/${blog.id}`}
                    sx={{
                      borderColor: 'secondary.main',
                      color: 'secondary.main',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        borderColor: 'secondary.dark'
                      }
                    }}
                  >
                    Edit Post
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Container>

        {/* Share Dialog */}
        <Dialog open={shareDialog} onClose={() => setShareDialog(false)}>
          <DialogTitle>Share This Blog</DialogTitle>
          <DialogContent>
            <Typography>
              Copy this link to share:
            </Typography>
            <Box sx={{
              p: 2,
              mt: 2,
              backgroundColor: 'background.paper',
              borderRadius: 1,
              wordBreak: 'break-all'
            }}>
              {window.location.href}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success('Link copied to clipboard!');
              setShareDialog(false);
            }}>
              Copy Link
            </Button>
            <Button onClick={() => setShareDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default BlogDetails;