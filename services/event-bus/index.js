import Express from "express";
import bodyParser from 'body-parser';
import axios from 'axios';

const app  = Express();
const port = process.env.PORT || '4005';

const POSTS_SERVICE_URL = process.env.POSTS_SERVICE_URL || 'http://localhost:4000';
const COMMENTS_SERVICE_URL = process.env.COMMENTS_SERVICE_URL || 'http://localhost:4001';
const QUERY_SERVICE_URL = process.env.QUERY_SERVICE_URL || 'http://localhost:4002';
const MODERATION_SERVICE_URL = process.env.MODERATION_SERVICE_URL || 'http://localhost:4003';


const events = [];

app.use(bodyParser.json());
app.post('/events', (req,res)=>{
    const event = req.body;
    events.push(event);
    axios.post(`${POSTS_SERVICE_URL}/events`, event);
    axios.post(`${COMMENTS_SERVICE_URL}/events`, event);
    axios.post(`${QUERY_SERVICE_URL}/events`, event);
    axios.post(`${MODERATION_SERVICE_URL}/events`, event);

    res.send({ status:'OK'});

});
app.get('/events',(req,res)=>{
    res.send(events);
});


app.listen(port, ()=> console.log('Listening to port '+port));