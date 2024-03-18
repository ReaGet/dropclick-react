import { Modal } from "components/ui/Modal";
import { useEffect, useState } from "react";
import { Plans } from "./SubscribitionModal/Plans";
import { Payment } from "./SubscribitionModal/Payment";
import { useAuth } from "hooks/useAuth";
import SubscribitionService from "services/Subscribition";

export const SubscribitionModal = (props) => {
  const {
    isModalOpen,
    onClose,
  } = props;

  const { user } = useAuth();

  const plans = [
    { value: 0, price: "40$", duration: "Месяц" },
    { value: 1, price: "110$", duration: "Три месяца" },
    { value: 2, price: "200$", duration: "Пол года" },
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [paymentAddress, setPaymentAddress] = useState("");
  const [state, setState] = useState(1);


  useEffect(() => {
    if (!user) return;

    SubscribitionService.getPaymentAddresses({ email: user.email }).then((result) => {
      setPaymentAddress(result[0]);
    });
  }, []);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setState(1);
        onClose();
      }}
      className={"bg-[#0D0D0D]"}
    >
      <div className="flex flex-col gap-6 w-full max-w-[700px] sm:px-8 text-xl sm:text-2xl text-white text-center">
        { state === 1 ? (
          <Plans
            plans={plans}
            selectedPlan={selectedPlan}
            onChange={(plan) => setSelectedPlan(plan)}
            onNextStep={() => setState(2)}
          />
        ) : (
          <Payment 
            selectedPlan={selectedPlan}
            paymentAddress={paymentAddress}
          />
        )}
      </div>
    </Modal>
  );
};

// Оформление подписки
// Для неограниченного доступа к материалам сайта необходимо оплатить подписку.

// Выберите тариф:


// К оплате:
// 40$