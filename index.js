import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/', (req,res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté !');
    socket.on('disconnect', () => {
        console.log("L'utilisateur s'est déconnecté");
    });
    socket.on('chat message', (msg) => {
        //console.log('message: ' +msg);
        io.emit('chat message',msg);
    });
});

io.emit('Hello','World');

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});

//Express initialise 'app' pour crée un serveur local ligne 5
//On définit une route / qui est appeller dans le page home.
//On écoute le serveur au port 3000