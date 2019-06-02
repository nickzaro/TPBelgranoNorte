const { io } = require('../server');

io.on('connection', (client) => {
    console.log("se conecto el cliente",client.id);
    client.on('disconnect',()=>{
        console.log("perdi coneccion con el cliente",client.id);
    })
});