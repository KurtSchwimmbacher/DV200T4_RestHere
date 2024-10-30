import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  // Fetch post data based on postId
  useEffect(() => {
    console.log(postId)
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/getSingle/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <p>Loading post...</p>;

  return (
    <Card className="custom-card">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
        {/* Display tags if available */}
        {post.tags && (
          <div>
            <strong>Tags: </strong>
            {post.tags.join(', ')}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
