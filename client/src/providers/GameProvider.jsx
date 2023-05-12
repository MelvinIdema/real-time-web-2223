import {useState, useEffect} from 'react'
import GameContext from './GameContext.js'
import {socket} from "../services/socket.js";
import {createUser} from "../entities/User.js";
import {toast} from "react-toastify";
import {createStory} from "../entities/Story.js";

function GameProvider({children}) {
    const [user, setUser] = useState(null);
    const [connected, setConnected] = useState(false);
    const [room, setRoom] = useState(null);
    const [users, setUsers] = useState([]);

    const [story, setStory] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        socket.on('room:storyUpdated', (story) => {
            const newStory = createStory(story);
            setStory(newStory);
            setIsFetching(false);
        });

        socket.on('story:fetching', () => {
            setIsFetching(true);
        })

        return () => {
            socket.off('room:storyUpdated');
            socket.off('story:fetching');
        }
    }, [story, isFetching])

    useEffect(() => {
        socket.on('room:started', () => {
            if (room) {
                setRoom({...room, status: 'started'})
            }
        });

        return () => {
            socket.off('room:started')
        }
    }, [room])

    useEffect(() => {
        socket.auth = user;
        if (!socket.connected) {
            socket.connect();
            setConnected(true)
        }
    }, [user, connected]);

    useEffect(() => {
        socket.on('user:updatedId', (newId) => {
            setUser(
                {...user, id: newId}
            )
        });

        return () => {
            socket.off('user:updatedId');
        }
    }, [user]);

    useEffect(() => {
        socket.on('user:newUser', (user) => {
            try {
                const theUser = createUser({
                    id: user.id,
                    name: user.name
                })
                setUsers([...users, theUser]);
            } catch (e) {
                toast.error(e.message);
            }
        });

        socket.on('user:userLeft', (userWhoLeft) => {
            setUsers(users.filter(user => userWhoLeft.id !== user.id));
        });

        socket.on('user:allUsers', (users) => {
            try {
                const newUsers = users.map(user => {
                    return createUser({
                        id: user.id,
                        name: user.name
                    });
                });
                setUsers(newUsers);
            } catch (e) {
                toast.error('Error loading users: ' + e.message);
            }
        });

        return () => {
            socket.off('user:newUser');
            socket.off('user:userLeft');
            socket.off('user:allUsers');
        }

    }, [users])

    return (
        <GameContext.Provider value={{user, setUser, connected, room, setRoom, users, setUsers, story, setStory, isFetching}}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider