import { Modal } from "components/ui/Modal";
import { Link } from "react-router-dom";

export const SubscribitionModalEnded = (props) => {
  const {
    isModalOpen,
    onClose,
  } = props;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        onClose();
      }}
      className={"bg-[#0D0D0D]"}
    >
      <div className="flex flex-col gap-6 w-full max-w-[700px] sm:px-8 text-xl sm:text-2xl text-white text-center">
        <span>Ваша подписка истекла.</span>
        <span>Вы можете продлить её в <Link to="/account" className="text-primary">личном кабинете</Link></span>
      </div>
    </Modal>
  );
};