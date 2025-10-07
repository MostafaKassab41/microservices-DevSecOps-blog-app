import Express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = Express();
const port = process.env.PORT || '4003' ;
const EVENT_BUS_SERVICE_URL = process.env.EVENT_BUS_SERVICE_URL || 'http://localhost:4005';

app.use(bodyParser.json());

app.post('/events',async (req,res)=>{
    const {type,data} =req.body;

    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        data.status = status;
        await axios.post(`${EVENT_BUS_SERVICE_URL}/events`,{
            type:'CommentModerated',
            data
        });
    }
    res.send({});
})
app.listen(port, ()=> console.log('Listening to port '+port));

