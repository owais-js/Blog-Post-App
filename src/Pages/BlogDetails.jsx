import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Box,
} from "@mui/material";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogDoc = doc(db, "blogs", id);
        const blogSnapshot = await getDoc(blogDoc);

        if (blogSnapshot.exists()) {
          setBlog({ id: blogSnapshot.id, ...blogSnapshot.data() });
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
  }, [id]);

  if (loading) {
    return (
      <Container style={{ marginTop: "2rem", textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container style={{ marginTop: "2rem" }}>
        <Typography variant="h5" color="error" align="center">
          Blog not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom color="primary">
            {blog.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            style={{ marginBottom: "1rem" }}
          >
            Author: {blog?.author?.name}
          </Typography>
          <Typography variant="body1" color="textPrimary" style={{ marginBottom: "1rem" }}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Content:
            </Typography>
            {blog.content}
          </Typography>

          {blog.tags && blog.tags.length > 0 && (
            <Box style={{ marginTop: "1rem" }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Tags:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {blog.tags.map((tag, index) => (
                  <Chip key={index} label={tag} variant="outlined" color="secondary" />
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default BlogDetails;
