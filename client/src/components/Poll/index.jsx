import User from '../User'
import {PollItemContainer, StyledPoll, StyledPollItem, VotedUsersList} from './style'

function Poll({options, onPollItemClick}) {
    return (
            <StyledPoll>
                {options.map((option, index) => (
                    <PollItemContainer key={index}>
                        <StyledPollItem onClick={() => onPollItemClick(index)}>
                            {option.text}
                        </StyledPollItem>
                        <VotedUsersList>
                            {option.votedUsers.map((name) => (
                                <User key={name} name={name}/>
                            ))}
                        </VotedUsersList>
                    </PollItemContainer>
                ))}
            </StyledPoll>
    )
}

export default Poll;