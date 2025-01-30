import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your Blogger Blog ID and API Key
  const blogId = '252009266376575171'; // Get this from the Blogger dashboard
  const apiKey = 'AIzaSyDrjcrh3E7vMf-_KI3oRtlD2jYu7AAWNSA'; // Your API Key

  // Function to fetch blog posts from Blogger API
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`
      );
      setPosts(response.data.items); // Save posts to state
      setLoading(false);
    } catch (error) {
      setError('Error fetching posts');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 200)}...</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
      </div>
    );
  };
  
  export default BlogPage;

