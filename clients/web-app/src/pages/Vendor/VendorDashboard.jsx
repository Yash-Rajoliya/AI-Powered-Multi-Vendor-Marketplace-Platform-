import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatsCards from "../../components/dashboard/StatsCards";
import RevenueChart from "../../components/dashboard/RevenueChart";
import ProductTable from "../../components/dashboard/ProductTable";
import OrdersTable from "../../components/dashboard/OrdersTable";
import AIInsights from "../../components/dashboard/AIInsights";

const VendorDashboard = () => {
  return (
    <DashboardLayout>
      
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h1>

      <StatsCards />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <RevenueChart />
        <AIInsights />
      </div>

      <ProductTable />
      <OrdersTable />

    </DashboardLayout>
  );
};

export default VendorDashboard;