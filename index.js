
const express = require('express');
const app= express();
const server = require('http').createServer(app);

// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     next();
//   });

porta = process.env.PORT || 3000;
const io = require('socket.io')(server);

app.use(express.static(__dirname+"/public"));
app.set('views', __dirname+"/public");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')


//socket
io.set('origins','*:*');
io.on('connection', socket=>{
    console.log("Socket conectado: +"+socket.id);
    socket.on('textoMod', data=>{
        console.log(data);
        socket.broadcast.emit('newText',data)
    })
})


app.use('/', (req,res)=>{
    res.render('index.html');
})
server.listen(porta, ()=>{
    console.log("Server running at: "+ porta)
})