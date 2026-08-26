const AddressStep = ({ next }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      
      <h2 className="font-semibold mb-4">Shipping Address</h2>

      <input placeholder="Full Name" className="input" />
      <input placeholder="Address" className="input mt-3" />
      <input placeholder="City" className="input mt-3" />

      <button
        onClick={next}
        className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded"
      >
        Continue
      </button>

    </div>
  );
};

export default AddressStep;