import React, { Fragment } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import NumberFormat from "react-number-format";

const NumberMask = (value) => (
  <NumberFormat
    value={value}
    displayType="text"
    thousandSeparator={true}
    suffix={"pcs"}
  />
);

const ProductSalesChart = ({ data }) => {
  return (
    <Fragment>
      <BarChart
        data={data}
        width={1825}
        height={300}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="productName" />
        <YAxis />
        <Tooltip formatter={NumberMask} />
        <Legend />
        <Bar name="Quantity Sold" dataKey="amountSold" fill="#3F51B5" />
      </BarChart>
    </Fragment>
  );
};

export default ProductSalesChart;
