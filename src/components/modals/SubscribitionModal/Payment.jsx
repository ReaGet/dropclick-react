export const Payment = (props) => {
  const {
    selectedPlan,
    paymentAddress,
  } = props;

  return (
    <>
      <div className="flex flex-col gap-8 text-[#c3c3c3]">
        <label className="flex flex-col items-start gap-2 w-full" htmlFor="address">
          Адрес кошелька
          <input
            className="w-full p-7 text-2xl text-white rounded-xl bg-[#15171C] outline-none"
            id="address"
            type="text"
            defaultValue={paymentAddress.adress}
            readOnly
          />
        </label>
        <label className="flex flex-col items-start gap-2 w-full" htmlFor="address">
          Сеть
          <input
            className="w-full p-7 text-2xl text-white rounded-xl bg-[#15171C] outline-none"
            id="address"
            type="text"
            defaultValue={paymentAddress.perev}
            readOnly
          />
        </label>
        <label className="flex flex-col items-start gap-2 w-full" htmlFor="address">
          Сумма перевода
          <input
            className="w-full p-7 text-2xl text-white rounded-xl bg-[#15171C] outline-none"
            id="address"
            type="text"
            defaultValue={selectedPlan.price}
            readOnly
          />
        </label>
      </div>
      <a
        target="_blank"
        className="button-outline px-8 py-4 mt-8 mx-auto rounded-full text-2xl"
        href="http://t.me/dropclick_admin"
      >
        Оплатил
      </a>
      <span className="mt-8 text-xl text-[#c3c3c3]">Для активации аккаунта, напишите нашему менеджеру в телеграмм, нажав кнопку выше. <br/>Мы уже работаем над автоматизацией оплаты. <br/>Приносим свои извинения.</span>
    </>
  )
}


// adress:"TEp6UBYT8waZstCqiPUFBtTnvGR6h68pE9"
// id:"1"
// perev:"TRC20"