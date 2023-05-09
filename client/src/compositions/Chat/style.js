import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
`;

export const ChatsContainer = styled.ul`
  list-style: none;
  padding: 0px 32px;
  max-height: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export const ChatForm = styled.form`
  display: flex;
  padding: 16px 32px;

  input {
    width: 100%;
  }
`;

export const ChatInput = styled.input`
  width: 100%;
  padding: 16px 32px;
  background-color: hsl(216, 14%, 21%);
  border: none;
  border-radius: 50px;
  font-size: 16px;
  color: hsl(0, 0%, 100%);
  margin-right: 16px;
  
  :focus {
    outline: hsl(216, 14%, 31%);
  }
`;

export const ChatButton = styled.button`
    background-color: hsl(216, 14%, 31%);
    border: none;
    border-radius: 50px;
    padding: 16px 32px;
    color: hsl(0, 0%, 100%);
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    
    :hover {
        background-color: hsl(216, 14%, 41%);
    }
    
    :focus {
        outline: hsl(216, 14%, 31%);
    }
`;