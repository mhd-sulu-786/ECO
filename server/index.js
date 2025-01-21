const express = require('express');
const app = express();
const soket = require('socket.io');
const mongoose =require('mongoose')
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = soket(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

mongoose.connect('mongodb://localhost:27017/ChatApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);   
})

app.get('/', (req, res) => {
    res.send('Hello World!');

});
