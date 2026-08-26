const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen p-6 shadow">
      
      <h2 className="text-xl font-bold mb-6">SmartCart</h2>

      <nav className="space-y-4">
        <a className="block hover:text-indigo-600">Dashboard</a>
        <a className="block hover:text-indigo-600">Products</a>
        <a className="block hover:text-indigo-600">Orders</a>
        <a className="block hover:text-indigo-600">Analytics</a>
      </nav>

    </div>
  );
};

export default Sidebar;