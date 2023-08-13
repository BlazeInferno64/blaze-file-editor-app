const express = require('express');
const path = require('path');

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const port = 80;

const router = express.Router();

const { lookup } = require('geoip-lite');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] ||req.connection.remoteAddress;
	res.sendFile(__dirname + '/index.html');
    console.log(`New request from : `,ip);
    console.log(lookup(ip));
});


io.on("connection", function(socket){
    users = socket.id;
    socket.on("new-user",function(username){
        //users[socket.id] = username;
        //username[socket.id] = users; 
        console.log(`${username} just got connected to the server`);
    });
    socket.on("File",(content) => {
        console.log(content);
    })
    socket.on("exit-user",(username) => {
        console.log(`${username} just got disconnected from the server`)
    })
})


server.listen(port, () => {
	//console.log(`Server is listening at the https://localhost:${port}/`);
	console.log(`Server is listening at localhost:${port}`);
});