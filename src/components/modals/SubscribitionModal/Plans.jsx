export const Plans = (props) => {
  const {
    plans,
    selectedPlan,
    onChange,
    onNextStep,
  } = props;

  return (
    <>
      <div className="mt-8 mb-6 text-4xl sm:text-5xl font-bold text-center">Оформление подписки</div>
        <div className="max-w-[500px] md:max-w-[600px] mt-8">Для неограниченного доступа к материалам сайта необходимо оплатить подписку.</div>
        <div className="flex flex-col gap-8 mt-16">
          <div className="text-2xl sm:text-4xl font-bold text-center">Выберите тариф:</div>
          <div className="flex flex-col sm:flex-row gap-8 w-full">
            { plans.map((plan) => {
                return (
                  <div
                    className={[
                      "flex flex-col gap-2 w-full sm:w-1/3 p-8 text-2xl bg-[#131313] hover:bg-[#131313] border rounded-xl cursor-pointer",
                      plan.value === selectedPlan.value ? "border-primary text-primary" : "border-[#262626] text-white"
                    ].join(" ")}
                    key={plan.value}
                    onClick={() => onChange(plan)}
                  >
                    <span>{ plan.duration }</span>
                    <span className="font-bold">{ plan.price }</span>
                  </div>
                )
            })}
          </div>
        </div>
        <button
          className="button-outline px-8 py-4 mt-8 mx-auto rounded-full text-2xl"
          onClick={onNextStep}
        >
          Оплатить
        </button>
    </>
  )
}