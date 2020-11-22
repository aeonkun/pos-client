import React, { Fragment } from "react";
import { OrderTableContainer, OrderStatusModal, Invoice } from "../";

const OrderList = ({
  data,
  openModal,
  openInvoice,
  handleOpenInvoice,
  handleCloseInvoice,
  handleOpenModal,
  handleCloseModal,
  status,
  updateStatusAndHistoryState,
  updateStatus,
  handleChangePage,
  page,
  handleChangeRow,
  rows,
}) => {
  return (
    <Fragment>
      <OrderTableContainer
        data={data}
        handleOpenModal={handleOpenModal}
        handleOpenInvoice={handleOpenInvoice}
        handleChangePage={handleChangePage}
        page={page}
        handleChangeRow={handleChangeRow}
        rows={rows}
      />
      <OrderStatusModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        status={status}
        updateStatusAndHistoryState={updateStatusAndHistoryState}
        updateStatus={updateStatus}
      />
      <Invoice
        openInvoice={openInvoice}
        handleOpenInvoice={handleOpenInvoice}
        handleCloseInvoice={handleCloseInvoice}
      />
    </Fragment>
  );
};

export default OrderList;
