import { Modal } from "components/ui/Modal";
import { useAuth } from "hooks/useAuth";
import { useState } from "react";

export const Security = () => {
  const { updatePassword } = useAuth();

  const [isModalOpen, setModalOpen] = useState(false);

  const handlePasswordFormSubmit = (event) => {
    event.preventDefault();
    updatePassword();
  }

  return (
    <>
      <section className="flex flex-col">
        <h2 className="mb-4 text-4xl font-semibold">Безопасность</h2>
        <div
          className="flex flex-col gap-20 mt-20"
        >
          <form
            className="flex flex-col gap-12"
            onSubmit={(event) => handlePasswordFormSubmit(event)}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <label
                className="flex flex-col item-center gap-4 h-full w-full text-xl xl:text-2xl text-[#a8a8a8] leading-5 xl:leading-6 overflow-hidden"
              >
                Старый пароль
                <input
                  className="w-full h-[44px] xl:h-[54px] px-4 sm:px-6 text-white border-none placeholder:text-[#4d5361] select-none outline-none bg-[#191919] focus:bg-[#272727] transition-colors rounded-lg"
                  type="password"
                  disabled
                />
              </label>
              <label
                className="flex flex-col item-center gap-4 h-full w-full text-xl xl:text-2xl text-[#a8a8a8] leading-5 xl:leading-6 overflow-hidden"
              >
                Новый пароль
                <input
                  className="w-full h-[44px] xl:h-[54px] px-4 sm:px-6 text-white border-none placeholder:text-[#4d5361] select-none outline-none bg-[#191919] focus:bg-[#272727] transition-colors rounded-lg"
                  type="password"
                  disabled
                />
              </label>
            </div>

            <button
              className="px-16 py-6 ml-auto bg-primary hover:bg-primary-hover text-black text-xl font-semibold rounded-xl"
              onClick={() => setModalOpen(true)}
            >Сменить пароль</button>
          </form>
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div className="flex flex-col gap-6 w-full max-w-[500px] text-2xl text-white text-center">
          <p>К сожалению, в данный момент вы не можете изменить свой пароль.</p>
          <p>Если вам это необходимо, обратитесь к администратору. Эта функция будет доступна в ближайшее время. Спасибо за понимание.</p>
        </div>
      </Modal>
    </>
  )
};