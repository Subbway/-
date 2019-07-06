//Web 应用程序
//Express是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架
const express = require('express');
const http = require('http');
const ws = require('ws'); 
// 创建express应用，实现web服务器
let app = express();

//通过http模块web服务器和socket服务器，让其共用一个端口
let server = http.Server(app);

// 内置中间件，利用中间件实现静态资源服务器
app.use(express.static('./'));

//创建server服务器

// WebSocket服务器
let SocketServer = ws.Server;
let socket = new SocketServer({
    server,
    port:1234
},()=>{
    console.log(1234)
});

socket.on('connection',()=>{
    //client:客户端
    //当客户端发送消息是执行message事件处理函数
    console.log(666)
    client.on('message',msg=>{
        console.log(msg)
        //接收到消息，广播到所有在线用户
        socket.clients.forEach(client=>{
           client.send(msg)  
        })
    })
    //当客户端退出时执行close事件处理函数
    client.on('close',()=>{
        socket.clients.forEach(client=>{
            client.send({status:0,data:'logout'})  
         })
    })
})
//自定义方法，用于广播消息
// 遍历所有用户对象，分别发送消息
socket.broadcast = msg =>{  
    socket.clients.forEach(function(client) { 
        client.send(msg)
    });  
}; 

let PORT = 1334;
app.listen(PORT,()=>{
    console.log('server is running on port %s',PORT)
})

//给socket添加事件处理函数
//当客户端连接socket服务器时执行回调
//每个客户端连接都会记录到socket.clients
