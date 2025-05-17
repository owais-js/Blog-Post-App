import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  CardMedia,
  Container,
  Avatar,
  IconButton,
  Skeleton,
  Divider,
  Menu,
  MenuItem
} from "@mui/material";
import {
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  Share,
  MoreVert,
  RemoveRedEye,
  Comment
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { db } from "../Config/FirebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";

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
    h4: {
      fontWeight: 700,
      letterSpacing: 0.5,
      lineHeight: 1.3
    },
    h5: {
      fontWeight: 600,
      fontFamily: '"Montserrat", sans-serif'
    },
    body1: {
      fontFamily: '"Montserrat", sans-serif',
      lineHeight: 1.8
    },
    body2: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "0.95rem",
      lineHeight: 1.7
    },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      letterSpacing: 0.5
    }
  },
  shape: {
    borderRadius: 16
  },
  shadows: [
    "none",
    "0 2px 8px rgba(31, 64, 55, 0.08)",
    "0 4px 12px rgba(31, 64, 55, 0.1)",
    ...Array(22).fill("none")
  ]
});

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState({});
  const [liked, setLiked] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = collection(db, "blogs");
        const blogQuery = query(blogCollection, orderBy("createdAt", "desc"));
        const blogSnapshot = await getDocs(blogQuery);
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSave = (blogId) => {
    setSaved((prev) => ({ ...prev, [blogId]: !prev[blogId] }));
  };

  const handleLike = (blogId) => {
    setLiked((prev) => ({ ...prev, [blogId]: !prev[blogId] }));
  };

  const handleMenuOpen = (event, blog) => {
    setAnchorEl(event.currentTarget);
    setCurrentBlog(blog);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentBlog(null);
  };

  const formatDate = (date) => {
    return new Date(date?.toDate()).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default, py: { xs: 4, md: 8 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 8 }, position: "relative" }}>
            <Typography variant="h4" component="h1" sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 2,
              position: "relative",
              display: "inline-block",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -12,
                left: "50%",
                transform: "translateX(-50%)",
                width: 80,
                height: 4,
                background: "primary.light",
                borderRadius: 2
              }
            }}>
              Exclusive Content Collection
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 800, mx: "auto", color: "text.secondary", mt: 3 }}>
              Discover premium articles crafted by our expert writers to inspire and elevate your knowledge.
            </Typography>
          </Box>

          {loading ? (
            <Grid container spacing={4}>
              {[...Array(6)].map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ height: "100%", overflow: "hidden" }}>
                    <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
                    <CardContent>
                      <Skeleton width="60%" height={32} animation="wave" />
                      <Skeleton width="100%" height={72} animation="wave" />
                      <Box sx={{ display: "flex", mt: 2 }}>
                        <Skeleton variant="circular" width={40} height={40} animation="wave" />
                        <Box sx={{ ml: 1.5, flexGrow: 1 }}>
                          <Skeleton width="60%" animation="wave" />
                          <Skeleton width="40%" animation="wave" />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={4}>
              {blogs.map((blog) => (
                <Grid item key={blog.id} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    boxShadow: 2,
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 3,
                      "& .blog-image": {
                        transform: "scale(1.05)"
                      }
                    },
                    border: "none",
                    overflow: "hidden",
                    position: "relative"
                  }}>
                    {blog.premium && (
                      <Box sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        zIndex: 1,
                        backgroundColor: "secondary.main",
                        color: "primary.dark",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: 12,
                        fontWeight: 700,
                        boxShadow: 1
                      }}>
                        PREMIUM
                      </Box>
                    )}

                    <Box sx={{ position: "relative", overflow: "hidden", height: 200 }}>
                      <CardMedia
                        className="blog-image"
                        component="img"
                        height="200"
                        image={blog?.imageUrl || blog?.author?.image || "https://source.unsplash.com/random/600x400/?luxury,blog"}
                        alt={blog.title}
                        sx={{
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          width: "100%"
                        }}
                      />
                      <Box sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "40%",
                        background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
                      }} />
                      <Box sx={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        right: 16,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end"
                      }}>
                        <Typography variant="caption" sx={{
                          color: "#ffffff",
                          fontWeight: 500,
                          fontSize: 12
                        }}>
                          {formatDate(blog.createdAt)}
                        </Typography>
                      </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3, pb: 0, display: "flex", flexDirection: "column" }}>
                      <Typography variant="h5" component="h2" sx={{
                        mb: 2,
                        minHeight: 64,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {blog.title}
                      </Typography>
                      <Typography variant="body2" sx={{
                        color: "text.secondary",
                        mb: 3,
                        flexGrow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {blog.content}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", mt: "auto", mb: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                          <RemoveRedEye fontSize="small" sx={{ color: "text.secondary", mr: 0.5 }} />
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {blog.views || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                          <Comment fontSize="small" sx={{ color: "text.secondary", mr: 0.5 }} />
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {blog.comments || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton
                          size="small"
                          onClick={() => handleLike(blog.id)}
                          sx={{
                            color: liked[blog.id] ? "secondary.main" : "text.secondary",
                            "&:hover": {
                              backgroundColor: alpha(theme.palette.secondary.main, 0.1)
                            }
                          }}
                        >
                          {liked[blog.id] ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
                        </IconButton>
                        <Typography variant="caption" sx={{
                          color: liked[blog.id] ? "secondary.main" : "text.secondary",
                          mr: 1.5
                        }}>
                          {(blog.likes || 0) + (liked[blog.id] ? 1 : 0)}
                        </Typography>
                      </Box>
                    </CardContent>

                    <Divider sx={{ mx: 3 }} />

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 3, pt: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={blog?.author?.image} alt={blog?.author?.name} sx={{
                          width: 40,
                          height: 40,
                          mr: 2,
                          border: "2px solid",
                          borderColor: "primary.light"
                        }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {blog?.author?.name || "Expert Writer"}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {blog?.author?.role || "Content Specialist"}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => handleSave(blog.id)}
                          sx={{
                            color: saved[blog.id] ? "secondary.main" : "text.secondary",
                            "&:hover": {
                              backgroundColor: alpha(theme.palette.secondary.main, 0.1)
                            }
                          }}
                        >
                          {saved[blog.id] ? <Bookmark fontSize="small" /> : <BookmarkBorder fontSize="small" />}
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, blog)}
                          sx={{
                            color: "text.secondary",
                            "&:hover": {
                              backgroundColor: alpha(theme.palette.primary.main, 0.1)
                            }
                          }}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box sx={{ px: 3, pb: 3 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => navigate(`/blog/${blog.id}`)}
                        sx={{
                          backgroundColor: "primary.main",
                          "&:hover": {
                            backgroundColor: "primary.dark"
                          },
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: "none",
                          fontSize: 15,
                          fontWeight: 600
                        }}
                      >
                        Read Full Article
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          elevation={4}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 180,
              borderRadius: 2,
              boxShadow: 3,
              border: "1px solid",
              borderColor: "divider"
            }
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Share fontSize="small" sx={{ mr: 1.5, color: "text.secondary" }} />
            Share
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <BookmarkBorder fontSize="small" sx={{ mr: 1.5, color: "text.secondary" }} />
            Save for later
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <RemoveRedEye fontSize="small" sx={{ mr: 1.5, color: "text.secondary" }} />
            View details
          </MenuItem>
          {currentBlog?.premium && (
            <MenuItem onClick={handleMenuClose}>
              <Favorite fontSize="small" sx={{ mr: 1.5, color: "secondary.main" }} />
              <Typography sx={{ color: "secondary.main" }}>
                Premium content
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </Box>
    </ThemeProvider>
  );
}

export default Blog;