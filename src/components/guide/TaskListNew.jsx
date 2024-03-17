export const TaskList = (props) => {
  const {
    tasks,
  } = props;

  return (
    <section className="flex w-full bg-[#0B0B0B] rounded-3xl overflow-hidden">
      <div className="flex flex-col gap-10 w-[380px] px-8 py-12">
        <button className="px-8 py-7 bg-[#111111] text-xl text-left rounded-3xl cursor-pointer">Получение тестовых токенов</button>
        <button className="px-8 py-7 bg-[#111111] text-xl text-left rounded-3xl cursor-pointer">Прохождение тестнета</button>
        <button className="px-8 py-7 bg-[#111111] text-xl text-left rounded-3xl cursor-pointer">Merkly - Создание контракта</button>
      </div>
      <div className="flex-grow min-h-full bg-[#111111]">

      </div>
    </section>
  );
};