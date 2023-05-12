import * as dotenv from 'dotenv'
dotenv.config();
import {createServer} from 'http'
import {Server} from 'socket.io'

import User from './entities/User.js'
import Message from './entities/Message.js'
import Room from './entities/Room.js'
import Story from "./entities/Story.js";

import {fetchStory} from './fetchStoryApi.js'

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

const rooms = new Map();

function insertNewStory(roomId, {
    paragraph = "One fateful day, while wandering through the woods, Amara stumbled upon a hidden cave. Inside, she found an ancient tome written in a language she didn’t recognize. As she read through the pages, a strange sensation coursed through her body.",
    options = [
        {
            text: "Continue reading",
            votedUsers: []
        },
        {
            text: "Close the book",
            votedUsers: []
        },
        {
            text: "Leave the cave",
            votedUsers: []
        }
    ]
} = {}) {
    const room = rooms.get(roomId);
    setTimeout(() => {
        room.story = new Story({
            paragraph: paragraph,
            options: options
        });
        io.to(roomId).emit('room:storyUpdated', room.story);
    }, 1000);
}

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

    socket.on('room:start', async (roomId) => {
        const room = rooms.get(roomId);
        rooms.status = 'started';
        io.to(roomId).emit('room:started', roomId);

        const story = await fetchStory({room});
        insertNewStory(roomId, story);
    });

    socket.on('story:vote', async (pollItemIndex) => {
        // If the user already voted on one of the items, return
        let userVoted = false;
        let amountOfUsersWhoVoted = 0;

        const room = rooms.get(me.roomId);
        room.story.options.forEach((option) => {
            if (option.votedUsers.includes(me.name)) {
                userVoted = true;
            }
            amountOfUsersWhoVoted += option.votedUsers.length;
        });

        if (userVoted) {
            return;
        }

        rooms.get(me.roomId).story.options[pollItemIndex].votedUsers.push(me.name);
        io.to(me.roomId).emit('room:storyUpdated', rooms.get(me.roomId).story);

        if (amountOfUsersWhoVoted === room.users.length - 1) {
            io.to(me.roomId).emit('story:fetching', room.story);

            let highestVotedOption = null;
            // Grab the highest voted option
            room.story.options.forEach((option) => {
                if (!highestVotedOption || option.votedUsers.length > highestVotedOption.votedUsers.length) {
                    highestVotedOption = option;
                }
            });

            const story = await fetchStory({room, message: highestVotedOption.text});
            insertNewStory(me.roomId, story);
        }
    });
});

httpServer.listen(3000, () => {
    console.log('Listening on port 3000');
});