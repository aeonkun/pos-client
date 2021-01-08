import React, { Fragment } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import NumberFormat from "react-number-format";

const NumberMask = (value) => (
  <NumberFormat
    value={value / 100}
    displayType="text"
    thousandSeparator={true}
    prefix={"₱"}
    decimalScale={2}
    fixedDecimalScale={true}
  />
);

const SalesGraph = ({ data }) => {
  return (
    <Fragment>
      <LineChart data={data} width={1825} height={300}>
        <XAxis dataKey="dateUnit" />
        <YAxis
          tickFormatter={(tick) => {
            return (tick / 100).toLocaleString(undefined, {
              minimumFractionDigits: 0,
            });
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip formatter={NumberMask} />
        <Legend />
        <Line
          name="Amount Sold (₱)"
          type="monotone"
          dataKey="value"
          stroke="#3F51B5"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </Fragment>
  );
};

export default SalesGraph;
