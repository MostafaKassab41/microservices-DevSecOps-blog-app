// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CommentCreate from './CommentCreate';
// import CommentList from './CommentList';
// import { Wrapper } from './PostCreate';

// const PostListComponent = () => {
//   console.log("test1");  
//   const [posts, setPosts] = useState({});

//   const POSTS_SERVICE_URL = process.env.POSTS_SERVICE_URL || 'http://localhost:4002';
  
  
//   const fetchPosts = async () => {
//     console.log("test2");
//     const res = await axios.get(`${POSTS_SERVICE_URL}/posts`);
//     setPosts(res.data);
//   };
//   useEffect(() => {
//     fetchPosts();

//   }, []);
//   const renderedPosts = Object.values(posts).map((post) => {
//     console.log("test3");
    
//       <Wrapper.Consumer>
//         {(data) => {
//           return (
//             <div
//               className="card"
//               style={{ width: '30%', marginBottom: '20px' }}
//               key={post.id}
//             >
//               <div className="card-body">
//                 <h3>
//                   {post.title} {data}
//                 </h3>
//                 <CommentList comments={post.comments} />
//                 <CommentCreate postId={post.id} />
//               </div>
//             </div>
//           );
//         }}
//       </Wrapper.Consumer>
//   console.log("test4");  
//   });
//   return (
//     <div className="d-flex flex-row flex-wrap justify-content-between">
//       {renderedPosts}
//     </div>
//   );
// };
// export default PostListComponent;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import { Wrapper } from './PostCreate';

const PostListComponent = () => {
  const [posts, setPosts] = useState({});
  const [error, setError] = useState('');

  const POSTS_SERVICE_URL = process.env.REACT_APP_POSTS_SERVICE_URL || 'http://localhost:4002';
  
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${POSTS_SERVICE_URL}/posts`);
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
    </div>
  );
};

export default PostListComponent;