import { MetricCard } from "@/components/dashboard/metric-card";
import { SalesTrendChart } from "@/components/dashboard/sales-trend-chart";
import { UserGrowthChart } from "@/components/dashboard/user-growth-chart";
import { CategoryDistributionChart } from "@/components/dashboard/category-distribution-chart";
import { UserDataTable } from "@/components/dashboard/user-data-table";
import { mockMetrics, mockSalesTrendData, mockUserGrowthData, mockCategoryDistributionData, mockUserData } from "@/lib/data";
import { Users, BarChart3, DollarSign, Activity } from "lucide-react"; // BarChart3 for Active Sessions
import type { Metric } from "@/types";

export default function DashboardPage() {
  const metrics: Metric[] = [
    { title: "Total Users", value: mockMetrics.totalUsers.toLocaleString(), icon: Users, trend: "+2% from last month" },
    { title: "Active Sessions", value: mockMetrics.activeSessions.toLocaleString(), icon: Activity, trend: "+10 since last hour" },
    { title: "Sales Revenue", value: `$${mockMetrics.salesRevenue.toLocaleString()}`, icon: DollarSign, trend: "+15% from last week" },
  ];

  return (
    <div className="container mx-auto py-6 sm:py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 font-heading text-foreground">Dashboard</h1>
      
      {/* Metrics Summary */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {metrics.map(metric => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-8">
        <div className="col-span-1 lg:col-span-2 xl:col-span-1">
           <SalesTrendChart data={mockSalesTrendData} />
        </div>
        <div className="col-span-1 lg:col-span-1 xl:col-span-1">
          <UserGrowthChart data={mockUserGrowthData} />
        </div>
        <div className="col-span-1 lg:col-span-1 xl:col-span-1">
          <CategoryDistributionChart data={mockCategoryDistributionData} />
        </div>
      </div>

      {/* Data Table Section */}
      <div>
        <UserDataTable data={mockUserData} />
      </div>
    </div>
  );
}
