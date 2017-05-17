var express = require('express')
var app = express();
var morgan = require("morgan");

app.use("/assets", express.static(__dirname+"/public"))

app.use(morgan("dev"))
app.set("view engine","ejs")

var server = require('http').Server(app)
var io = require('socket.io')(server);

io.on('connection',function(socket){
    console.log('người dùng đã kết nối vào '+ socket.id)

    socket.on('disconnect', function(){
        console.log('người dùng đã hủy kết nối vào '+ socket.id)
    })

    //Server accept data from Client guest
    socket.on('Client-send-data',function(data){
        console.log(socket.id + " vừa gửi " +  data)

        //Server send data from all client guest
        io.sockets.emit('Server-send-data', data +'888')

        //server accept data from client guest but not send is this
        //socket.broadcast.emit('Server-send-data', data +'999')

        //Server only send is this
        //socket.emit('Server-send-data', data +'999')

        //send to client : io.to(socket.id).emit()

    });

    socket.on('Client-send-color', function(data){
        console.log(socket.id + " vừa gửi " +  data)
        io.sockets.emit('Server-send-colorData', data)
    })
})

//Settings
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.render('index')
})

server.listen(port, function () {
    console.log("Smart home API is listening on port: " + port);
});