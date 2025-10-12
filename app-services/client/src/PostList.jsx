import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import { Wrapper } from './PostCreate';

const PostListComponent = () => {
  const [posts, setPosts] = useState({});
  const [error, setError] = useState('');

  // Define all config at the beginning
  const config = window.__CONFIG__ || {};
  const QUERY_SERVICE_URL = config.QUERY_SERVICE_URL || 'http://localhost:4002';
  const VERSION = config.VERSION || 'v1.0.0';
  const VERSION_COLOR = config.VERSION_COLOR || '#666';

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${QUERY_SERVICE_URL}/posts`);
      console.log("Posts data:", res.data); // Debug log
      setPosts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to load posts: ' + err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    console.log("Rendering post:", post.id);
    
    return (
      <Wrapper.Consumer key={post.id}>
        {(data) => {
          return (
            <div
              className="card"
              style={{ width: '30%', marginBottom: '20px' }}
            >
              <div className="card-body">
                <h3>
                  {post.title} {data}
                </h3>
                <CommentList comments={post.comments} />
                <CommentCreate postId={post.id} />
              </div>
            </div>
          );
        }}
      </Wrapper.Consumer>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {error && <div className="alert alert-danger">{error}</div>}
      {renderedPosts}
      <div style={{ marginTop: '20px', fontSize: '14px', color: VERSION_COLOR }}>
        Version: {VERSION}
      </div>
    </div>
  );
};

export default PostListComponent;