import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Button, IconButton, Text } from 'components/index';

const BasicModal = ({
  open,
  close,
  title,
  onClose,
  onConfirm,
  children,
  warning,
  confirmMessage,
  closeMessage,
}) => {
  return createPortal(
    <>
      <BackDrop className={open ? 'active' : close ? '' : ''} />
      <ModalWrapper className={open ? 'active' : close ? '' : ''}>
        <InnerWrapper>
          <ModalHeader>
            {title && <Text className="header_title">{title}</Text>}
            <IconButton
              src={'/asset/icons/Close_no_shadow.svg'}
              alt="close"
              onClick={onClose}
              className={'close_Button'}
              style={{ width: '16px', height: '16px' }}
            />
          </ModalHeader>
          <ModalContent>
            <Text tiny lineHeight={'16px'} center>
              {children}
            </Text>
            {warning}
          </ModalContent>
          <ModalActions>
            {onClose && (
              <Button size="tiny" onClick={onClose}>
                {closeMessage ? closeMessage : '취소'}
              </Button>
            )}
            {onConfirm && (
              <Button size="tiny" secondary onClick={onConfirm}>
                {confirmMessage ? confirmMessage : '확인'}
              </Button>
            )}
          </ModalActions>
        </InnerWrapper>
      </ModalWrapper>
    </>,
    document.getElementById('modal'),
  );
};

BasicModal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
  action: PropTypes.any,
  open: PropTypes.bool,
  close: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  children: PropTypes.any,
  warning: PropTypes.any,
  confirmMessage: PropTypes.string,
  closeMessage: PropTypes.string,
};

const ModalWrapper = styled.div`
  position: fixed;
  min-width: 213px;
  min-height: auto;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.white};
  top: 50%;
  left: 50%;
  transform: translate(-50%, 200%);
  border-radius: ${({ theme }) => theme.style.borderRadius.rounded};
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;

  &.active {
    opacity: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    visibility: visible;
  }
`;
const InnerWrapper = styled.div`
  padding: 14px 16px;
`;
const ModalHeader = styled.div`
  display: flex;
  column-gap: 8px;
  width: 100%;
  align-items: center;
  justify-content: flex-end;

  > .header_title {
    flex: 1;
  }
`;
const ModalContent = styled.div`
  margin: 18px 0;
`;
const ModalActions = styled.div`
  display: flex;
  justify-content: space-evenly;
  column-gap: 8px;
`;

const BackDrop = styled.div`
  position: fixed;
  height: 100%;
  z-index: 99;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;

  &.active {
    opacity: 0.5;
    visibility: visible;
  }
`;

export default BasicModal;
