const CheckoutSteps = ({ step }) => {
  const steps = ["Address", "Payment", "Review"];

  return (
    <div className="flex gap-6">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= i + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </div>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;