import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = Express();
const port = process.env.PORT || '4002';
const EVENT_BUS_SERVICE_URL = process.env.EVENT_BUS_SERVICE_URL || 'http://localhost:4005';

const posts = {};
app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req,res)=>{
    res.send(posts);
});

const handleEvents = (type, data)=>{
    if (type === "PostCreated"){
        const {id, title} = data;
        posts[id] = {
            id, title, comments:[]
        };
    }
    if (type === 'CommentCreated'){
        const {id, content, postId, status} = data;
        posts[postId].comments.push({id, content,status});

    }
    if (type === 'CommentUpdated'){
        const {id, content, postId, status} = data;
        const comment = posts[postId].comments.find((comment)=>{
            return comment.id === id;
        })
        comment.status = status;
        comment.content = content;
    }
}

app.post('/events', (req,res)=>{
    const {type, data } = req.body;
    handleEvents(type,data);
    res.send({});
});

app.listen(port, async ()=>{
    console.log('Listening to port '+port);
    const res = await axios.get(`${EVENT_BUS_SERVICE_URL}/events`);
    for (let event of res.data){
        console.log('Handling Event: ',event.type);
        handleEvents(event.type, event.data);
    }
});
