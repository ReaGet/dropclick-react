export const PersonalInfo = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <section className="flex flex-col">
      <h2 className="mb-4 text-4xl font-semibold">Личная информация</h2>
      <form
        className="flex flex-col gap-20 mt-20"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="flex flex-col md:flex-row gap-8">
          <label
            className="flex flex-col item-center gap-4 h-full w-full text-xl xl:text-2xl text-[#a8a8a8] leading-5 xl:leading-6 overflow-hidden"
          >
            Имя
            <input
              className="w-full h-[44px] xl:h-[54px] px-4 sm:px-6 text-white border-none select-none outline-none bg-[#191919] focus:bg-[#272727] transition-colors rounded-lg"
              type="text"
              defaultValue="Рифат"
            />
          </label>
          <label
            className="flex flex-col item-center gap-4 h-full w-full text-xl xl:text-2xl text-[#a8a8a8] leading-5 xl:leading-6 overflow-hidden"
          >
            Фамилия
            <input
              className="w-full h-[44px] xl:h-[54px] px-4 sm:px-6 text-white border-none select-none outline-none bg-[#191919] focus:bg-[#272727] transition-colors rounded-lg"
              type="text"
              defaultValue="Мухаметзянов"
            />
          </label>
        </div>
        <label
          className="flex flex-col item-center gap-4 h-full w-full text-xl xl:text-2xl text-[#a8a8a8] leading-5 xl:leading-6 overflow-hidden"
        >
          Кошелек
          <input
            className="w-full h-[44px] xl:h-[54px] px-4 sm:px-6 text-white border-none select-none outline-none bg-[#191919] focus:bg-[#272727] transition-colors rounded-lg"
            type="text"
            disabled
          />
        </label>
        <button className="px-16 py-6 ml-auto bg-primary hover:bg-primary-hover text-black text-xl font-semibold rounded-xl">Сохранить</button>
      </form>
    </section>
  )
};