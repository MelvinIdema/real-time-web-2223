import styled, {css} from 'styled-components';

export const AppContainer = styled.div`
  display: grid;

  ${props => props.isWaiting === true && css`
    grid-template-rows: 50px 1fr;
    grid-template-columns: auto 6fr;
  `}
  
  ${props => props.isWaiting === false && css`
    grid-template-rows: 1fr;
    grid-template-columns: auto 6fr;
  `}
  
  height: 100vh;
`;

export const HeaderContainer = styled.header`
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    background-color: hsl(220, 12%, 14%);
    padding: 0 16px;
    color: #fff;
`;

export const ChooseUsernameContainer = styled.div`
  grid-column: 1 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  background-color: hsl(220, 12%, 14%);
  margin: 16px;
  padding: 32px;
  border-radius: 16px;
`;

export const ControlsContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 150px 1fr;
  width: 75%;
  background-color: hsl(220, 12%, 20%);
  border-radius: 16px;
  height: 80vh;
  margin: 10vh auto 0;
  padding: 16px;
  color: #fff;
`;

export const CreateGameContainer = styled.div`
  grid-row: 2 / 3;
  background-color: hsl(220, 12%, 14%);
  margin: 16px;
  padding: 32px;
  border-radius: 16px;
`;

export const JoinGameContainer = styled.div`
  grid-row: 2 / 3;
  background-color: hsl(220, 12%, 14%);
  margin: 16px;
  padding: 32px;
  border-radius: 16px;
`;