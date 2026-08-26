import Layout from "../../app/layout";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import AddressStep from "../../components/checkout/AddressStep";
import PaymentStep from "../../components/checkout/PaymentStep";
import ReviewStep from "../../components/checkout/ReviewStep";
import { useState } from "react";

const CheckoutPage = () => {
  const [step, setStep] = useState(1);

  return (
    <Layout>
      <CheckoutSteps step={step} />

      <div className="mt-10">
        {step === 1 && <AddressStep next={() => setStep(2)} />}
        {step === 2 && <PaymentStep next={() => setStep(3)} />}
        {step === 3 && <ReviewStep />}
      </div>
    </Layout>
  );
};

export default CheckoutPage;