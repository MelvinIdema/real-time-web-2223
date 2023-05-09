import styled, { css } from 'styled-components'

export const StyledChatBalloon = styled.div`
  background-color: hsl(216, 14%, 31%);
  padding: 16px 32px 16px 24px;
  color: hsl(0, 0%, 100%);
  font-size: 16px;
  width: fit-content;
  margin-left: 0;
  position: relative;
  z-index: 1;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 50px;
  grid-area: b;
  
  // if isMine is set to true set the margin-left to 100%
  ${props => props.isMine && css`
    padding: 16px 24px 16px 32px;
    text-align: right;
    margin-left: auto;
    background-color: hsl(227, 97%, 71%);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 50px;
    grid-area: a;
  `}
  
  :before {
    content: '';
    position: absolute;
    height: 50%;
    aspect-ratio: 1/1;
    bottom: 0;

    border-top-left-radius: 100%;
    background-color: hsl(216, 14%, 31%);
    left: -2px;
    z-index: 0;

    ${props => props.isMine && css`
      left: unset;
      border-top-left-radius: unset;
      border-top-right-radius: 100%;
      right: -2px;
      background-color: hsl(227, 97%, 71%);
    `}
  }
`

export const ChatBalloonContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: 'a b';
    margin-bottom: 16px;
  
    ${props => props.isMine && css`
      grid-template-columns: 1fr auto;
    `}
`

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
    color: hsl(0, 0%, 100%);
    margin-right: 16px;
  
  ${props => props.isMine && css`
      margin-left: 16px;
      margin-right: 0;
    `}
`