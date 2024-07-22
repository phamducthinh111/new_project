"use client";

import { me } from "@/api/auth";
import { getOrderRevenue, getOrderSummary, getStatusOrderSummary } from "@/api/order";
import { formatVND } from "@/constants/formatVND.constants";
import { Card, Col, Row, Statistic } from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Column = dynamic(() => import("@ant-design/charts").then(mod => mod.Column), { ssr: false });
const Pie = dynamic(() => import("@ant-design/charts").then(mod => mod.Pie), { ssr: false });

export default function Dashboard() {
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [orderStatusSummary, setOrderStatusSummary] = useState<StatusOrderSummary[] | null>(null);
  const [refreshData, setRefreshData] = useState<boolean>(false);

  useEffect(() => {
    // Fetch revenue data and order summary from your API
    const fetchData = async () => {
      const orderSummaryResponse = await getOrderSummary();
      if (orderSummaryResponse) {
        setOrderSummary(orderSummaryResponse);
      }
      const revenueResponse = await getOrderRevenue();
      if (revenueResponse) {
        setRevenueData(revenueResponse);
      }
      const orderStatusSumResponse = await getStatusOrderSummary();
      if (orderStatusSumResponse) {
        setOrderStatusSummary(orderStatusSumResponse);
      }
      setRefreshData(false);
    };

    fetchData();
  }, [refreshData]);

  // Convert string to number and sort by date
  const sortedRevenueByDay = (revenueData?.revenueByDay || [])
    .map((data) => ({ ...data, count: Number(data.count) }))
    .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1))
    .sort((a, b) => a.count - b.count);

  const ColconfigDay = {
    data: sortedRevenueByDay,
    xField: "date",
    yField: "count",
    xAxis: {
      title: { text: "Date" },
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      title: { text: "Count" },
      label: {
        formatter: (v: number) => `${v}`,
      },
    },
    barWidthRatio: 0.8, // Adjust the width of the bars
  };

  const pieData = (orderStatusSummary || []).map(status => ({
    type: status.status,
    value: parseInt(status.count, 10)
  }));

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.5,
    // label: {
    //   type: 'outer',
    //   content: '{name} {percentage}',
    // },
    // interactions: [{ type: "element-selected" }, { type: "element-active" }],
    // statistic: {
    //   title: false,
    //   content: {
    //     style: {
    //       whiteSpace: "pre-wrap",
    //       overflow: "hidden",
    //       textOverflow: "ellipsis",
    //     },
    //     formatter: function formatter() {
    //       return `total\n${pieData?.reduce((acc, cur) => acc + cur.value, 0)}`;
    //     },
    //   },
    // },
  };

  return (
    <div className="mt-5">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Orders"
              value={orderSummary?.totalOrdersNotDeleted}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={
                orderSummary ? formatVND(orderSummary?.totalRevenue) : undefined
              }
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Products Sold"
              value={orderSummary?.totalProductsSold}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mt-4">
        <Col span={12}>
          <Card title="Order Status Distribution">
            <Column {...ColconfigDay} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Revenue By Day">
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
