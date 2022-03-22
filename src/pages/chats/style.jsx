import styled from 'styled-components';

export const ChatWrapper = styled.div`
  //display: flex;
  //flex-direction: column;
  border: 1px solid red;
`;
export const MessageWrapper = styled.div``;

export const Sender = styled.div`
  color: #ddd;
  font-size: 0.5rem;
`;

export const Receiver = styled.div`
  color: #ddd;
  font-size: 0.5rem;
`;

export const ReceiverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  margin: 10px;
`;
export const SenderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 4px;
  margin: 10px;
`;

export const SenderInner = styled.div`
  background-color: #f3da45;
  border-radius: 4px;
  padding: 4px;
`;

export const ReceiverInner = styled.div`
  background-color: #50b4d4;
  border-radius: 4px;
  padding: 4px;
`;
export const JoinerLeaver = styled.div`
  background-color: #e8e8e8;
  border-radius: 4px;
  padding: 4px;
  text-align: center;
  margin: 10px;
`;
