import React from "react";
import { Modal } from "antd";
import { IoMdClose } from "react-icons/io";

const AddAdminModal = ({
  isModalOpen,
  setIsModalOpen,
  closeIcon,
  children,
  maxWidth,
  backgroundColor,
  onAddAdminPage,
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
      width={"65%"}
      style={{
        maxWidth: maxWidth || "444px",
        backgroundColor: backgroundColor,
        marginInline: "auto",
      }}
    >
      <div>
        <div className="border-b w-full pb-2">
          <h2 className="text-xl font-lora text-red-700">Add Admin</h2>
          {closeIcon !== false && (
            <button
              onClick={handleCancel}
              type="primary"
              className={`absolute top-1 right-1 text-white p-2 rounded-md ${
                onAddAdminPage
                  ? "bg-none shadow-none"
                  : "bg-[#F0E2E8] shadow-inner"
              }`}
            >
              <IoMdClose color="#932018" size={23} />
            </button>
          )}
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default AddAdminModal;
