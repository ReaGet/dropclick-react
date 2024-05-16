import { Modal } from "components/ui/Modal";

export const SubscribitionModalStatus = (props) => {
  const {
    isModalOpen,
    onClose,
    children
  } = props;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        onClose();
      }}
      className={"bg-[#0D0D0D]"}
    >
      {children}
    </Modal>
  );
};