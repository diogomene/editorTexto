
const express = require('express');
const app= express();
const server = require('http').createServer(app);
const helmet = require('helmet');
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'","https: 'unsafe-inline'"],
			objectSrc: ["'none'"],
			scriptSrc: ["'self'", "https: 'unsafe-inline'"],
			styleSrc: ["'self'", "https: 'unsafe-inline'"],
			upgradeInsecureRequests: [],
		},
	},
}));
porta = process.env.PORT || 3000;
const io = require('socket.io')(server);

app.use(express.static(__dirname+"/public"));
app.set('views', __dirname+"/public");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')


//socket
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