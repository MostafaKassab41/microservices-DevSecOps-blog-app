import React,{useState} from 'react';
import axios from 'axios';

const CommentCreate= ({postId})=>{
    const [content, setContent] = useState('');

    const config = window.__CONFIG__ || {};
    const COMMENTS_SERVICE_URL = config.COMMENTS_SERVICE_URL || 'http://localhost:4001';

    const onSubmit = async (event)=>{
        event.preventDefault();
        await axios.post(`${COMMENTS_SERVICE_URL}/posts/${postId}/comments`,{content});
        setContent('');

    }

    return (
    <div>
        <form onSubmit={onSubmit} className ="form-group" >
            <label>New Comments</label>
            <input value={content} onChange={e =>setContent(e.target.value)} type="text" className="form-control"/>    
            <button className="btn btn-primary mt-2">Submit</button> 
        </form>

    </div>);

}
export default CommentCreate;