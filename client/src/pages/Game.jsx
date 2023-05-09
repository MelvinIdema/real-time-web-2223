import {useEffect, useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {socket} from '../services/socket'

import UserList from '../compositions/UserList'
import Chat from '../compositions/Chat'

import GameContext from '../providers/GameContext.js'

import {AppContainer, HeaderContainer} from './Game.style.js'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Game() {
    const {user, users, room, setRoom} = useContext(GameContext);
    const navigate = useNavigate();
    const [isWaiting, setIsWaiting] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/', {
                state: {message: 'You cannot join a room directly.'}
            });
        }
    }, [user])

    useEffect(() => {
        if (room && room.status === 'started') {
            setIsWaiting(false);
        }

        socket.on('user:newUser', (user) => {
            setRoom({...room, users: [...room.users, user]});
        });

        return () => {
            socket.off('user:newUser');
        }
    }, [room]);

    useEffect(() => {
        socket.emit('game:entered');

        socket.on('connect_error', (err) => {
            console.error(err.message);
        });

        return () => {
            socket.off('connect_error');
        }
    }, []);

    function handleAdventureStart() {
        socket.emit('room:start', room.id);
    }

    return (
        <>
            <ToastContainer position="bottom-right"/>
            <AppContainer isWaiting={isWaiting}>
                {!isWaiting ? (
                    <>
                        <UserList/>
                        <Chat/>
                    </>
                ) : <>
                    <HeaderContainer>
                        <h1>{user ? user.roomId : 'error'}</h1>
                    </HeaderContainer>
                    <h1>Waiting for players...</h1>
                    <ul>
                        {room && users.map((user) => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                    <button onClick={handleAdventureStart}>Start Adventure</button>
                </>
                }
            </AppContainer>
        </>
    )
}

export default Game
