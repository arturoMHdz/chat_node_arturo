
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

// Crear servidor HTTP a partir de Express
const server = http.createServer(app);

// Servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Crear Socket.IO
const io = new Server(server);

// Conexión de un cliente
io.on('connection', (socket) => {
    console.log('Hay una conexión:', socket.id);

    // Recibir mensaje del chat
    socket.on('chat', (data) => {
        console.log(data);

        // Enviar el mensaje a todos los clientes conectados
        io.emit('chat', data);
    });

    // Avisar cuando un usuario está escribiendo
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});

// Iniciar servidor
server.listen(4000, () => {
    console.log('Servidor corriendo en http://localhost:4000');
});

