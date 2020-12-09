import React, { Fragment } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const ProductSalesChart = () => {
  const data = [
    {
      name: "Cheesy",
      value: 196,
    },
    {
      name: "Schublig",
      value: 54,
    },
    {
      name: "Spicy",
      value: 80,
    },
    {
      name: "Hungarian",
      value: 280,
    },
    {
      name: "Beef",
      value: 32,
    },
  ];

  return (
    <Fragment>
      <ResponsiveContainer width={1200} height={300}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar name="Quantity Sold" dataKey="value" fill="#3F51B5" />
        </BarChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

export default ProductSalesChart;
