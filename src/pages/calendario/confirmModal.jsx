import React, { useState } from 'react';
import { Button, Modal } from 'antd';
export const ConfirmModal = ({open, setOpen, choosedDateTime, choosedHour}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="Confirmar Aula"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p> Deseja marcar sua aula na data {choosedDateTime} ás {choosedHour}?</p>
      </Modal>
    </>
  );
};
