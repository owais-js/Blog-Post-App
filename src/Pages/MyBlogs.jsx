import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  CardMedia,
  Container,
  Avatar,
  IconButton,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  alpha,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Bookmark,
  BookmarkBorder,
  Edit,
  Delete,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { db } from "../Config/FirebaseConfig";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1f4037",
      light: "#99f2c8",
      dark: "#173029",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f8b400",
      contrastText: "#1f4037",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f4037",
      secondary: "#5a6d62",
    },
  },
  typography: {
    fontFamily: ['"Playfair Display"', '"Montserrat"', "serif"].join(","),
    h4: {
      fontWeight: 700,
      letterSpacing: 0.5,
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontFamily: '"Montserrat", sans-serif',
    },
    body1: {
      fontFamily: '"Montserrat", sans-serif',
      lineHeight: 1.8,
    },
    body2: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "0.95rem",
      lineHeight: 1.7,
    },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    "none",
    "0 2px 8px rgba(31, 64, 55, 0.08)",
    "0 4px 12px rgba(31, 64, 55, 0.1)",
    ...Array(22).fill("none"),
  ],
});

const defaultBlogImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmUqy_SZxyRxGX8EFwFZhxLseYirbZcDzWQ&s";

function MyBlogs() {
  const { currentuser } = useAuth();
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, blogId: null });
  const [saved, setSaved] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentuser) return;

    const q = query(collection(db, "blogs"), where("author.uid", "==", currentuser.uid));

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
        console.error("Error fetching blogs:", error);
        setLoading(false);
        toast.error("Failed to load blogs");
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
      toast.loading("Deleting blog...");

      try {
        await deleteDoc(doc(db, "blogs", deleteDialog.blogId));
        toast.dismiss();
        toast.success("Blog deleted successfully!");
      } catch (error) {
        toast.dismiss();
        toast.error("Error deleting blog");
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleRead = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleSave = (blogId) => {
    setSaved((prev) => ({ ...prev, [blogId]: !prev[blogId] }));
  };

  const formatDate = (date) => {
    return new Date(date?.toDate()).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default, py: { xs: 4, md: 8 } }}>
        <Toaster />
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 8 }, position: "relative" }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
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
                  borderRadius: 2,
                },
              }}
            >
              My Blog Collection
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 800, mx: "auto", color: "text.secondary", mt: 3 }}>
              Manage and view all the blogs you've created with our platform.
            </Typography>
          </Box>

          {loading ? (
            <Grid container spacing={4}>
              {[...Array(6)].map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ height: "100%", overflow: "hidden" }}>
                    <Box sx={{ pt: "56.25%", position: "relative" }}>
                      <CircularProgress
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "primary.main",
                        }}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : myBlogs.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No blogs to display.
              </Typography>
              <Box
                component="button"
                onClick={() => navigate("/CreateBlog")}
                style={{
                  marginTop: 24,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                Create Your First Blog
              </Box>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {myBlogs.map((blog) => (
                <Grid item key={blog.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      boxShadow: 2,
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 3,
                        "& .blog-image": {
                          transform: "scale(1.05)",
                        },
                      },
                      border: "none",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {blog.premium && (
                      <Box
                        sx={{
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
                          boxShadow: 1,
                        }}
                      >
                        PREMIUM
                      </Box>
                    )}

                    <Box sx={{ position: "relative", overflow: "hidden", height: 200 }}>
                      <CardMedia
                        className="blog-image"
                        component="img"
                        height="200"
                        image={blog?.imageUrl || blog?.author?.image || defaultBlogImage}
                        alt={blog.title}
                        sx={{
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          width: "100%",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "40%",
                          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 16,
                          left: 16,
                          right: 16,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#ffffff",
                            fontWeight: 500,
                            fontSize: 12,
                          }}
                        >
                          {formatDate(blog.createdAt)}
                        </Typography>
                      </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3, pb: 0, display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          mb: 2,
                          minHeight: 64,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          mb: 3,
                          flexGrow: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {blog.content}
                      </Typography>
                    </CardContent>

                    <Divider sx={{ mx: 3 }} />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 3,
                        pt: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={blog?.author?.image}
                          alt={blog?.author?.name}
                          sx={{
                            width: 40,
                            height: 40,
                            mr: 2,
                            border: "2px solid",
                            borderColor: "primary.light",
                          }}
                        />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {blog?.author?.name || "You"}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {blog?.author?.role || "Blog Author"}
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
                              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            },
                          }}
                        >
                          {saved[blog.id] ? (
                            <Bookmark fontSize="small" />
                          ) : (
                            <BookmarkBorder fontSize="small" />
                          )}
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Updated Icon Buttons */}
                    <Box
                      sx={{
                        px: 3,
                        pb: 3,
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        aria-label="read article"
                        onClick={() => handleRead(blog.id)}
                        sx={{
                          color: "primary.main",
                          border: "1.5px solid",
                          borderColor: "primary.main",
                          borderRadius: 2,
                          p: 1.5,
                          fontSize: 22,
                          "&:hover": {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          },
                          minWidth: 48,
                          minHeight: 48,
                        }}
                      >
                        <Visibility fontSize="medium" />
                      </IconButton>

                      <IconButton
                        aria-label="edit blog"
                        onClick={() => handleEdit(blog.id)}
                        sx={{
                          color: "primary.main",
                          border: "1.5px solid",
                          borderColor: "primary.main",
                          borderRadius: 2,
                          p: 1.5,
                          fontSize: 22,
                          "&:hover": {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          },
                          minWidth: 48,
                          minHeight: 48,
                        }}
                      >
                        <Edit fontSize="medium" />
                      </IconButton>

                      <IconButton
                        aria-label="delete blog"
                        onClick={() => setDeleteDialog({ open: true, blogId: blog.id })}
                        sx={{
                          color: "error.main",
                          border: "1.5px solid",
                          borderColor: "error.main",
                          borderRadius: 2,
                          p: 1.5,
                          fontSize: 22,
                          "&:hover": {
                            backgroundColor: alpha(theme.palette.error.main, 0.1),
                          },
                          minWidth: 48,
                          minHeight: 48,
                        }}
                      >
                        <Delete fontSize="medium" />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialog.open}
            onClose={() => setDeleteDialog({ open: false, blogId: null })}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-dialog-description">
                Are you sure you want to delete this blog? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Box
                component="button"
                onClick={() => setDeleteDialog({ open: false, blogId: null })}
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px 16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                }}
              >
                Cancel
              </Box>
              <Box
                component="button"
                onClick={handleDelete}
                style={{
                  backgroundColor: theme.palette.error.main,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Delete
              </Box>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default MyBlogs;
