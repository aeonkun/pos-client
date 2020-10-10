import React from "react";
import { OrderTable } from "../";
import { format } from "date-fns";

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return format(date, "MM/dd/yyyy hh:mm:ss aa");
}

const OrderTableContainer = ({ data, handleOpenModal }) => {
  return (
    <OrderTable
      data={data}
      handleOpenModal={handleOpenModal}
      formatDateTime={formatDateTime}
    />
  );
};

export default OrderTableContainer;
