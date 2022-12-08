const express = require('express')
const app = express()
const config = require('config')
const http = require('http').createServer(app)
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 8000
app.use(express.static(__dirname + '/public'));

var UserList = config.Users

http.listen(PORT, ()=>{
    console.log(`server started on port number : ${PORT}`)
})

app.get('/' ,(req, res) => {
    res.render("home.ejs", {users:UserList})
})
app.get("/:id" ,(req, res) => {
    
    UserList.forEach(element => {
        if(req.params.id === element.userName){
            res.render("Chatbox.ejs",{user: element})
        }
            
    });
   // res.send(req.params.id+" is an invalid Username / Username doesnot exists")
    
})


//socket

const io= require('socket.io')(http)

io.on('connection', (socket) =>{
    console.log("connected")

    socket.on('messege', (msg) => {
        console.log(msg)
        socket.broadcast.emit('messege',msg)

    })

})