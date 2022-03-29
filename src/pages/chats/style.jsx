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
  //position: fixed;
  //bottom: 0;
  //z-index: 11;
  width: 100%;
  //height: 90%;
  //height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  //transform: translateY(100%);
  //transition: all 0.3s ease;
  padding: 0 24px;
  overflow-y: auto;
  height: calc(100% - 66px);

  &.active {
    transform: translateY(0);
  }
`;

export const EnterLeaveWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryYellow};
  justify-content: center;
  margin: 16px 0;
  padding: 8px;
  border-radius: 10px;
`;
export const MessengerWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 16px 0;
`;
export const MessengerInner = styled.div`
  margin-left: 8px;
`;
export const Messenger = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 5px;
`;
export const UserProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 10em;
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
