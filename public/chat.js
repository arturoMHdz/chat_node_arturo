// Conexión con el servidor Socket.IO
var socket = io.connect();

// Obtener elementos del HTML
var persona = document.getElementById('persona'),
    appChat = document.getElementById('app-chat'),
    panelBienvenida = document.getElementById('panel-bienvenida'),
    usuario = document.getElementById('usuario'),
    mensaje = document.getElementById('message-input'),
    btnEnviar = document.getElementById('enviar'),
    escribiendoMensaje = document.getElementById('escribiendo-mensaje'),
    output = document.getElementById('output');


// Botón para enviar mensajes
btnEnviar.addEventListener('click', function () {

    if (mensaje.value.trim()) {

        socket.emit('chat', {
            persona: usuario.value,
            mensaje: mensaje.value
        });

        // Limpiar campo de mensaje
        mensaje.value = '';
    }

});


// Detectar cuando el usuario está escribiendo
mensaje.addEventListener('keyup', function () {

    if (usuario.value) {

        socket.emit('typing', {
            nombre: usuario.value,
            texto: mensaje.value
        });

    }

});


// Recibir mensajes del servidor
socket.on('chat', function (data) {

    // Quitar mensaje "está escribiendo"
    escribiendoMensaje.innerHTML = '';

    // Mostrar mensaje recibido
    output.innerHTML +=
        '<p><strong>' +
        data.persona +
        '</strong>: ' +
        data.mensaje +
        '</p>';

});


// Mostrar quién está escribiendo
socket.on('typing', function (data) {

    if (data.texto) {

        escribiendoMensaje.innerHTML =
            data.nombre + ' está escribiendo...';

    } else {

        escribiendoMensaje.innerHTML = '';

    }

});


// Entrar al chat
function ingresarChat() {

    if (persona.value.trim()) {

        // Ocultar bienvenida
        panelBienvenida.style.display = 'none';

        // Mostrar chat
        appChat.style.display = 'block';

        // Copiar nombre
        usuario.value = persona.value;

        // Evitar modificar el nombre
        usuario.readOnly = true;
    }

}

var sonidoMensaje = document.getElementById('sonido-mensaje');

socket.on('chat', function(data) {

    escribiendoMensaje.innerHTML = '';

    output.innerHTML +=
        '<p><strong>' +
        data.persona +
        '</strong>: ' +
        data.mensaje +
        '</p>';

    sonidoMensaje.currentTime = 0;
    sonidoMensaje.play().catch(function(error) {
        console.log('El navegador bloqueó el sonido:', error);
    });
});
