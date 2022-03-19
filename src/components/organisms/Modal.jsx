import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'components/atoms';

const Modal = (props) => {
  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  return (
    <React.Fragment>
      <ModalOverlay visible={props.visible} />
      <ModalWrapper
        onClick={props.maskClosable ? onOverlayClick : null}
        tabIndex="-1"
        visible={props.visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          {props.isClosed && <Button onClick={close} />}
          {props.children}
        </ModalInner>
      </ModalWrapper>
    </React.Fragment>
  );
};

Modal.propTypes = {
  visible: PropTypes.bool,
  isClosed: PropTypes.bool,
  children: PropTypes.any,
  maskClosable: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

export default Modal;
