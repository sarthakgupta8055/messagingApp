const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const messageRoutes = express.Router();
const PORT = 4000;

let MessageDb = require('./message.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/MessageApp', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
//all messages
messageRoutes.route('/allMessages').get(function(req, res) {
    data = {
        message :null,
        count : null
    }
    MessageDb.count({} , function(err, count) {
        if(err){
            console.log(err);
        }
        else{
            data.count=count;
        }
    })
    MessageDb.find(function(err, messages) {
        if (err) {
            console.log(err);
        } else {
            data.message = messages;
            res.json(data);
        }
    });
});
//new message
messageRoutes.route('/').post(function(req, res) {
    let newMessage = new MessageDb(req.body);
    newMessage.save()
        .then(newMessage => {
            res.status(200).json({'message': 'message added'});
        })
        .catch(err => {
            res.status(400).send('adding failed');
        });
});

app.use('/messages', messageRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});







