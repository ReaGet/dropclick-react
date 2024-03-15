export const Subscribition = () => {
  return (
    <section className="flex flex-col">
      <h2 className="mb-4 text-4xl font-semibold">Подписка</h2>
      <p className="text-xl text-[#a8a8a8]">Подписка позволяет получить неограниченный доступ к материалам сайта. Мы предоставляем на выбор несколько тарифных планов. Без подписки доступ не предоставляются.</p>
      <div className="flex flex-col gap-12 mt-20">
        <label
          className="flex flex-col item-center gap-4 h-full w-full text-xl xl:text-2xl text-[#a8a8a8] leading-5 xl:leading-6 overflow-hidden"
        >
          Дата начала подписки
          <input
            className="w-full sm:w-1/2 h-[44px] xl:h-[54px] px-4 sm:px-6 text-white border-none placeholder:text-[#4d5361] select-none outline-none bg-[#191919] focus:bg-[#272727] transition-colors rounded-lg"
            type="text"
            value="19.02.2024"
            disabled
          />
        </label>
        <label
          className="flex flex-col item-center gap-4 h-full w-full text-xl xl:text-2xl text-[#a8a8a8] leading-5 xl:leading-6 overflow-hidden"
        >
          Дата окончания подписки
          <input
            className="w-full sm:w-1/2 h-[44px] xl:h-[54px] px-4 sm:px-6 text-white border-none placeholder:text-[#4d5361] select-none outline-none bg-[#191919] focus:bg-[#272727] transition-colors rounded-lg"
            type="text"
            value="19.03.2024"
            disabled
          />
        </label>
      </div>
    </section>
  )
};