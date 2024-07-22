interface RevenueByDay {
  date: Date;
  count: string;
}

interface RevenueByMonth {
  month: Date;
  count: string;
}

interface RevenueByYear {
  year: Date;
  count: string;
}

interface StatusOrderSummary {
  status: string;
  count: string;
}

interface RevenueData {
  revenueByDay: RevenueByDay[];
  revenueByMonth: RevenueByMonth[];
  revenueByYear: RevenueByYear[];
}

interface OrderSummary {
  totalOrders: number;
  totalOrdersDeleted: number;
  totalOrdersNotDeleted: number;
  totalRevenue: number;
  totalProductsSold: number;
}
