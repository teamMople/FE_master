import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper, Image, Logo, Modal } from 'components';

const Test = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          isClosed={true}
          maskClosable={true}
          onClose={closeModal}
        >
          Hello
        </Modal>
      )}
    </>
  );
};

export default Test;
