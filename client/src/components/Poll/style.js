import styled from 'styled-components'

export const StyledPoll = styled.ul`
    list-style-type: none;
    padding: 0px;
    margin: 0;
`

export const PollItemContainer = styled.li`
    display: flex;
`

export const StyledPollItem = styled.div`
  background: #fff;
  color: black;
  padding: 10px;
  width: fit-content;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.2rem;

  &:hover {
    background: hsl(0, 0%, 83%);
  }
`

export const VotedUsersList = styled.div`
    display: flex;
    gap: 10px;
`