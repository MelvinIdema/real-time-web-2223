import {useState, useEffect, useContext} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {ChooseUsernameContainer, ControlsContainer, CreateGameContainer, JoinGameContainer} from './Game.style.js'

import {toast, ToastContainer} from 'react-toastify'
import humanId from 'human-id'

import GameContext from '../providers/GameContext.js'
import {createUser} from '../entities/User.js'
import {socket} from '../services/socket.js'
import {createRoom} from "../entities/Room.js";

function ControlsPage() {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const {connected, setUser, setRoom, room} = useContext(GameContext);

    useEffect(() => {
        if (location.state && location.state.message) {
            toast(location.state.message, {
                type: 'error',
                toastId: location.state.message
            });
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    function handleCreateGame() {
        if (username !== '') {
            const newUser = createUser({
                id: Math.random() * 100,
                name: username,
                roomId: humanId()
            });
            setUser(newUser);
        } else {
            toast('Please enter a username', {
                type: 'error',
                toastId: 'username'
            });
        }
    }

    function handleJoinGame() {
        if (username !== '') {
            const newUser = createUser({
                id: Math.random() * 100,
                name: username,
                roomId: roomId
            });
            setUser(newUser);
        } else {
            toast('Please enter a username', {
                type: 'error',
                toastId: 'username'
            });
        }
    }

    useEffect(() => {
        socket.on('room:joined', (roomFromServer) => {
            const localRoom = JSON.parse(roomFromServer);
            const newRoom = createRoom(localRoom);
            setRoom(newRoom);
            navigate(`/game`);
        });

        return () => {
            socket.off('room:joined');
        }
    }, [connected, room]);

    return (<>
        <ToastContainer position="bottom-right"/>
        <ControlsContainer>
            <ChooseUsernameContainer>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" name="username" value={username}
                       onInput={e => setUsername(e.target.value)} autoFocus/>
            </ChooseUsernameContainer>
            <CreateGameContainer>
                <h2>Create a new game</h2>
                <button onClick={handleCreateGame}>Create Game</button>
            </CreateGameContainer>
            <JoinGameContainer>
                <h2>Join an existing game</h2>
                <label htmlFor="roomId">RoomId:</label><br/>
                <input type="text" name="roomId" value={roomId}
                       onInput={e => setRoomId(e.target.value)} autoFocus/>
                <br/>
                <button onClick={handleJoinGame}>Join Game</button>
            </JoinGameContainer>
        </ControlsContainer>

    </>)
}

export default ControlsPage;