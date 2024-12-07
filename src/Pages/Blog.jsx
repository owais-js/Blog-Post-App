import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Box,
  CardMedia,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { db } from "../Config/FirebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e",
    },
    secondary: {
      main: "#ffd700",
    },
    background: {
      default: "#f3f4f6",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h6: {
      fontWeight: 600,
    },
    body2: {
      fontSize: "0.95rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
});

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = collection(db, "blogs");
        const blogQuery = query(blogCollection, orderBy("createdAt", "desc"));
        const blogSnapshot = await getDocs(blogQuery);
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Container style={{ marginTop: "2rem" }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            color="primary"
            marginBottom={"2rem"}
            fontWeight={600}
          >
            Welcome to the Blog Platform!
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress style={{ color: "#1a237e" }} size={50} />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {blogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "300px",
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: "transform 0.3s ease-in-out",
                      },
                    }}
                  >
                    <CardMedia
                      sx={{ overflow: "hidden", height: "150px" }}
                    >
                      <img src={blog?.author?.image} alt="" width={"100%"} />
                    </CardMedia>
                    <CardContent style={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        {blog.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ marginBottom: "1rem" }}
                      >
                        {blog.content.substring(0, 100)}...
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        Author: {blog?.author?.name || "Unknown"}
                      </Typography>
                    </CardContent>

                    <CardActions
                      sx={{ justifyContent: "center" }}
                    >
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/blog/${blog.id}`)}
                        sx={{
                          fontWeight: 600,
                          backgroundColor: theme.palette.primary.main,
                          alignItems: "center",
                          color: "white",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        }}
                      >
                        Read More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Blog;
