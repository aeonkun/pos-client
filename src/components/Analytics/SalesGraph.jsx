import React, { Fragment } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SalesGraph = ({ data }) => {
  return (
    <Fragment>
      <ResponsiveContainer width={1200} height={300}>
        <LineChart data={data.salesActivities}>
          <XAxis dataKey="dateUnit" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            name="Amount Sold (₱)"
            type="monotone"
            dataKey="value"
            stroke="#3F51B5"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

export default SalesGraph;
