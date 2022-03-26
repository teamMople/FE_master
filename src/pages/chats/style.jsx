import styled from 'styled-components';

export const BackDrop = styled.div`
  position: fixed;
  height: 100%;
  z-index: 10;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;

  &.active {
    opacity: 0.5;
    visibility: visible;
`;

export const ChatWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 11;
  width: 100%;
  height: 90%;
  background-color: ${({ theme }) => theme.colors.white};
  transform: translateY(100%);
  transition: all 0.3s ease;

  &.active {
    transform: translateY(0);
  }
`;
export const MessageWrapper = styled.div``;

export const Sender = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 0.5rem;
`;

export const Receiver = styled.div`
  color: ${({ theme }) => theme.colors.lightGray};
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
  background-color: ${({ theme }) => theme.colors.primaryYellow};
  border-radius: 4px;
  padding: 4px 8px;
`;

export const ReceiverInner = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 4px;
  padding: 4px 8px;
`;
export const JoinerLeaver = styled.div`
  background-color: #e8e8e8;
  border-radius: 4px;
  padding: 4px;
  text-align: center;
  margin: 10px;
`;
export const TextInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 16px 24px;
`;
