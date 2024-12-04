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
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

function BlogDetails() {
  const { id } = useParams();
  const { currentuser } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogDoc = doc(db, "blogs", id);
        const blogSnapshot = await getDoc(blogDoc);

        if (blogSnapshot.exists()) {
          const blogData = blogSnapshot.data();
          setBlog({ id: blogSnapshot.id, ...blogData });
          setLikes(blogData.likes || 0);
          if (currentuser) {
            setHasLiked(blogData.likedBy?.includes(currentuser.uid));
          }
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentuser) {
      fetchBlogDetails();
    }
  }, [id, currentuser]);

  const handleLike = async () => {
    if (!currentuser || hasLiked) return;

    try {
      const blogDoc = doc(db, "blogs", id);

      setLikes((prev) => prev + 1);
      setHasLiked(true);

      await updateDoc(blogDoc, {
        likes: likes + 1,
        likedBy: arrayUnion(currentuser.uid),
      });
    } catch (error) {
      console.error("Error liking the blog:", error);
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleUnlike = async () => {
    if (!currentuser || !hasLiked) return;

    try {
      const blogDoc = doc(db, "blogs", id);

      setLikes((prev) => prev - 1);
      setHasLiked(false);

      await updateDoc(blogDoc, {
        likes: likes - 1,
        likedBy: arrayRemove(currentuser.uid),
      });
    } catch (error) {
      console.error("Error unliking the blog:", error);
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

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

          <Box
            display="flex"
            alignItems="center"
            style={{ marginTop: "1.5rem" }}
          >
            <IconButton
              onClick={hasLiked ? handleUnlike : handleLike}
              color="primary"
            >
              {hasLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
            </IconButton>
            <Typography variant="body1" color="textPrimary" style={{ marginLeft: "0.5rem" }}>
              {likes} {likes === 1 ? "Like" : "Likes"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default BlogDetails;
