import {useEffect, useRef, useState, useContext} from 'react'
import {socket} from '../../services/socket'
import {ChatButton, ChatContainer, ChatForm, ChatInput, ChatsContainer} from './style'
import ChatBalloon from '../../components/ChatBalloon'
import {createMessage} from '../../entities/Message'
import {toast} from 'react-toastify'
import GameContext from "../../providers/GameContext.js";

function Index() {
    const chatsContainerRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const {user} = useContext(GameContext);

    /**
     * Scrolls to bottom of chats container on a new message
     */
    useEffect(() => {
        if (chatsContainerRef.current) {
            chatsContainerRef.current.scrollTop = chatsContainerRef.current.scrollHeight;
        }
    }, [messages])

    useEffect(() => {
        socket.on('chat:newMessage', (msg) => {
            try {
                const theMsg = createMessage({
                    id: msg.id,
                    content: msg.content,
                    userId: msg.userId,
                    userName: msg.userName,
                    timeStamp: msg.timeStamp,
                    isMine: msg.userId === user.id
                });
                setMessages([...messages, theMsg]);
            } catch (e) {
                toast.error(e.message);
            }
        })

        socket.on('chat:allMessages', (messages) => {
            try {
                const newMessages = messages.map(msg => {
                    return createMessage({
                        id: msg.id,
                        content: msg.content,
                        userId: msg.userId,
                        userName: msg.userName,
                        timeStamp: msg.timeStamp,
                        isMine: msg.userId === user.id
                    });
                });
                setMessages(newMessages);
            } catch (e) {
                toast.error('Error loading messages: ' + e.message);
            }
        });

        return () => {
            socket.off('chat:newMessage');
            socket.off('chat:allMessages');
        }

    }, [messages])


    function sendMessage(text) {
        socket.emit('chat:newMessage', text);
    }

    function handleMessageFormSubmit(e) {
        e.preventDefault();
        if (newMessage !== '') {
            sendMessage(newMessage);
            setNewMessage('');
        }
    }

    return (
        <ChatContainer>
            <ChatsContainer ref={chatsContainerRef}>
                {messages.map((msg, i) => (
                    <li key={i}>
                        <ChatBalloon isMine={msg.isMine} userName={msg.userName}>
                            {msg.content}
                        </ChatBalloon>
                    </li>
                ))}
            </ChatsContainer>
            <ChatForm action="" onSubmit={handleMessageFormSubmit} autoComplete="false">
                <ChatInput type="text" onInput={e => setNewMessage(e.target.value)} value={newMessage}
                           autoComplete="false"
                           autoFocus/>
                <ChatButton>Send</ChatButton>
            </ChatForm>
        </ChatContainer>
    )
}

export default Index;