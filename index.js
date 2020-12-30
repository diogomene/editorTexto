
const express = require('express');
const app= express();
const server = require('http').createServer(app);

porta = process.env.PORT || 3000;
const io = require('socket.io')(server, {cors: {
    origin: '*',
  }});

app.use(express.static(__dirname+"/public"));
app.set('views', __dirname+"/public");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
//socket
    app.use(allowCrossDomain);


app.set('origins','*:*')
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