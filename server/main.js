import {createServer} from 'http'
import {Server} from 'socket.io'

import User from './entities/User.js'
import Message from './entities/Message.js'
import Room from './entities/Room.js'

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:5173",
    }
});

const rooms = new Map();

/**
 * Middleware for checking if the user is authenticated
 * Adds the user to the socket object
 */
io.use((socket, next) => {
    const name = socket.handshake.auth.name;
    const roomId = socket.handshake.auth.roomId;

    if (!name) {
        return next(new Error('invalid username'));
    }
    if (!roomId) {
        return next(new Error('invalid roomId'));
    }

    if (!socket.user) {
        const newUser = new User({
            name,
            roomId
        });
        socket.user = newUser;
    }

    next();
});

io.on('connection', (socket) => {
    const me = new User({
        id: socket.user.id,
        name: socket.user.name,
        roomId: socket.user.roomId
    });
    socket.emit('user:updatedId', me.id);

    if (!rooms.get(me.roomId)) {
        const newRoom = new Room({
            id: me.roomId,
            users: [],
            messages: [],
            status: 'waiting'
        })
        rooms.set(me.roomId, newRoom);
    }

    socket.join(me.roomId);
    rooms.get(me.roomId).users.push(me);
    socket.emit('room:joined', JSON.stringify(rooms.get(me.roomId)));
    socket.broadcast.to(me.roomId).emit('user:newUser', me.toJSON());

    socket.on('game:entered', () => {
        socket.emit('user:allUsers', rooms.get(me.roomId).users.map(user => user.toJSON()));
        socket.emit('chat:allMessages', rooms.get(me.roomId).messages.map(message => message.toJSON()));
    });

    socket.on('disconnect', () => {
        socket.broadcast.to(me.roomId).emit('user:userLeft', rooms.get(me.roomId).users.find(user => user.id === socket.user.id).toJSON());
        rooms.get(me.roomId).users = rooms.get(me.roomId).users.filter(user => user.id !== socket.user.id);
    });

    socket.on('chat:newMessage', (msg) => {
        const theMsg = new Message({
            userId: socket.user.id,
            userName: socket.user.name,
            content: msg
        });
        rooms.get(socket.user.roomId).messages.push(theMsg);
        io.to(socket.user.roomId).emit('chat:newMessage', theMsg.toJSON());
    });

    socket.on('room:start', (roomId) => {
        rooms.get(roomId).status = 'started';
        io.to(roomId).emit('room:started', roomId);
    });
});

httpServer.listen(3000, () => {
    console.log('Listening on port 3000');
});