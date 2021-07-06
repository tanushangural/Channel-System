const express = require('express');
const app = express();
const Channels = require('./module/channels');
let channels = Channels.channels;
let PORT = 8080;

let channelsName = [];
channels.forEach(element => {
    channelsName.push(element.name);
});

app.get('/',(req,res)=>{
    res.send('Home');
});

app.get('/channels',(req,res)=>{
    res.json(channelsName);
})


app.get('/:currentChannel',(req,res)=>{
    let currentChannel = req.params.currentChannel;
    channels.forEach(element => {
        if(element.name == currentChannel){
            res.status(200).send(element.subscribers);
        }
    });
    res.send(404).send('Channel not found');
})

app.get('/:userName/:channelName',(req,res)=>{
    let channelName = req.params.channelName;
    let userName = req.params.userName;
    let flag = false;
    channels.forEach(element => {
        if(element.name == channelName){
            element.subscribers.push(userName);
            flag=true;
        }
    });
    if(flag == false)res.send('Channel not found');
    else res.send(`${userName} You have subscribed ${channelName}`);
})

app.get('/:userName/:channelName/:message',(req,res)=>{
    let message = req.params.message;
    let channelName = req.params.channelName;
    let userName = req.params.userName;
    console.log(message);
    console.log(`Publish by ${userName} on channel ${channelName}`);
    console.log('Send to');
    for(let i=0;i<channels.length;i++){
        if(channels[i].name == channelName){
            for(let j=0;j<channels[i].subscribers.length;j++){
                console.log(channels[i].subscribers[j]);
            }
        }
    }
    res.send(`${userName}, you have publish message on channel ${channelName}`);

})

app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`);
});