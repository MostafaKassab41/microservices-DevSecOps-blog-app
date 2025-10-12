import React, { createContext, useState } from 'react';
import axios from 'axios';
const Wrapper = createContext();

const PostCreate = () => {
  const [title, setTitle] = useState('');
  
  const config = window.__CONFIG__ || {};
  const POSTS_SERVICE_URL = config.POSTS_SERVICE_URL || 'http://localhost:4000';

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`${POSTS_SERVICE_URL}/posts/create`, { title });
    setTitle('');
  };
  return (
    <Wrapper.Provider value={'rehan'}>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Title </label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mt-2">Submit</button>
        </form>
      </div>
    </Wrapper.Provider>
  );
};
export default PostCreate;
export { Wrapper };
