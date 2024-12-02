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
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { db } from "../Config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
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
      fontSize: "0.9rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
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
        const blogSnapshot = await getDocs(blogCollection);
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
                    style={{
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                      borderRadius: "15px",
                    }}
                  >
                    <CardContent>
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
                      <Typography variant="body2" color="#263238">
                        Author: {blog?.author?.name}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        style={{ textTransform: "none" }}
                        onClick={() => navigate(`/blog/${blog.id}`)}
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
