import {ChatBalloonContainer, StyledChatBalloon, UserContainer} from './style.js'

const ChatBalloon = ({children, isMine, userName}) => {
    return (
        <ChatBalloonContainer isMine={isMine}>
            <UserContainer isMine={isMine}>
                {userName}
            </UserContainer>
            <StyledChatBalloon isMine={isMine}>
                {children}
            </StyledChatBalloon>
        </ChatBalloonContainer>
    )
}

export default ChatBalloon