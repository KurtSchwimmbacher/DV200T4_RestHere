import React, {useState, useEffect} from 'react';
import PostCard from './PostCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

const PostContainer = ({ handleShow }) => {

    // get user info
    const user = useSelector((state) => state.user);

    // useState to hold user posts
    const [userPosts, setUserPosts] = new useState([]);

    

    // function to fetch all posts by user
    const fetchUserPosts = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/posts/user/${userId}`);
            // store response data in useState
            setUserPosts(response.data);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };
    
    // use effect to ensure fetching re runs when user changes
    // and doesnt run when user isnt signed in
    useEffect(()=>{
        if(user.userID){
            // fetch posts by user
            fetchUserPosts(user.userID);
        }
        // re run when userID changes
    },[user.userID])


    // Callback function to refresh posts (for after editing posts)
    const refreshPosts = () => {
        if (user.userID) {
            fetchUserPosts(user.userID);
        }
    };


  return (
   <Container>
    <Row>
        {/* if posts exist */}
        {userPosts.length > 0 ? (
            // map each post
            userPosts.map((post) => (
                // ensure unique key for each column
                <Col key={post._id}>
                    {/* use data from db to populate card info */}
                    <PostCard
                        postId={post._id}
                        title={post.title}
                        text={post.content}
                        handleShow={handleShow}
                        postTags={post.tags}
                        // pass refresh posts function
                        refreshPosts={refreshPosts}
                    />
                </Col>
            ))
        // rest of conditional statement
        ):(
            // message displayed if no posts exist
            <Col>
                <h4>No posts found</h4>
            </Col>
        )}
    </Row>
   </Container>
  );
};

export default PostContainer;
