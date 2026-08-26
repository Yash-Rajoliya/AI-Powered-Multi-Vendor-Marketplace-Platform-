const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-2xl shadow w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input placeholder="Name" className="input" />
        <input placeholder="Email" className="input mt-3" />
        <input placeholder="Password" type="password" className="input mt-3" />

        <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded">
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;