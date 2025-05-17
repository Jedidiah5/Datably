export type User = {
  id: string;
  fullName: string;
  email: string;
};

export type Metric = {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string; // e.g., "+5% from last month"
};

export type SalesTrendItem = {
  month: string;
  sales: number;
};

export type UserGrowthItem = {
  month: string;
  users: number;
};

export type CategoryDistributionItem = {
  name: string;
  value: number;
  fill: string;
};

export type UserDataItem = {
  id: string;
  fullName: string;
  email: string;
  registrationDate: string;
  status: "Active" | "Inactive" | "Pending";
};
