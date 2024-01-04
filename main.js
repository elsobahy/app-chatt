const express=require('express');

const port=process.env.PORT || 5000;
const path=require('path')
const {Server}=require('socket.io')
const http=require('http')
const app=express();
const server=http.createServer(app)
const io=new Server(server)




app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})
app.get('/style.css',(req,res)=>{
    res.sendFile(path.join(__dirname,'/style.css'));
})

io.on('connection',(socket)=>{
    console.log(" user is connected",socket.id)

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit("send_message_to_all_users",msg)
    });
    socket.on('typing',()=>{
        socket.broadcast.emit("show_typing_status")
    })

    socket.on('stop_typing',()=>{
        socket.broadcast.emit("clear_typing_status")
    })

  });



server.listen(port,()=>{
    console.log("http://localhost:"+port)
})