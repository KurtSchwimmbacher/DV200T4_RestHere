import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Nav } from 'react-bootstrap';

const SinglePost = () => {
  const { resourceID } = useParams();
  const [resource, setResource] = useState(null);

  // Fetch resource data based on Id
  useEffect(() => {
    console.log(resourceID)
    const fetchResource = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/resource/getSingle/${resourceID}`);
        setResource(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchResource();
  }, [resourceID]);

  if (!resource) return <h1>Loading Resource...</h1>;

  return (
    <Card className="custom-card">

      <Card.Body>
        <Card.Title>{resource.title}</Card.Title>
        <Card.Text>{resource.content}</Card.Text>
        {/* Display tags if available */}
        {resource.tags && (
          <div>
            <strong>Tags: </strong>
            {resource.tags.join(', ')}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
