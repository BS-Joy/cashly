import React from "react";
import { Modal } from "antd";
import { IoMdClose } from "react-icons/io";

const DashboardModal = ({
  isModalOpen,
  setIsModalOpen,
  closeIcon,
  children,
  maxWidth,
  backgroundColor,
}) => {
  //   const handleOk = () => {
  //     setIsModalOpen(false);
  //   };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={null}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      closeIcon={false}
      style={{
        maxWidth: maxWidth || "444px",
        backgroundColor: backgroundColor,
      }}
    >
      <div>
        {closeIcon !== false && (
          <button
            onClick={handleCancel}
            type="primary"
            className="absolute top-1 right-1 text-white bg-[#F0E2E8] shadow-inner p-2 rounded-md"
          >
            <IoMdClose color="#932018" size={23} />
          </button>
        )}
        {children}
      </div>
    </Modal>
  );
};

export default DashboardModal;
