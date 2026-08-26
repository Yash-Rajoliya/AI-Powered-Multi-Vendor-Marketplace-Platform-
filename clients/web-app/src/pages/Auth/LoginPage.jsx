const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-2xl shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input placeholder="Email" className="input" />
        <input placeholder="Password" type="password" className="input mt-3" />

        <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;