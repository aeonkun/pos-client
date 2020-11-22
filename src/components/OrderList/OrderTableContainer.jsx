import React from "react";
import { OrderTable } from "../";
import { format } from "date-fns";

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return format(date, "MM/dd/yyyy hh:mm:ss aa");
}

const OrderTableContainer = ({
  data,
  handleOpenModal,
  handleOpenInvoice,
  handleChangePage,
  page,
  handleChangeRow,
  rows,
}) => {
  return (
    <OrderTable
      data={data}
      handleOpenInvoice={handleOpenInvoice}
      handleOpenModal={handleOpenModal}
      formatDateTime={formatDateTime}
      handleChangePage={handleChangePage}
      page={page}
      handleChangeRow={handleChangeRow}
      rows={rows}
    />
  );
};

export default OrderTableContainer;
