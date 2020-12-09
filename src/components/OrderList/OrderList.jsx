import React, { Fragment } from "react";
import { OrderTableContainer, OrderStatusModal, InvoiceDisplay } from "../";

const OrderList = ({
  data,
  openModal,
  handleOpenModal,
  handleCloseModal,
  status,
  updateStatusAndHistoryState,
  updateStatus,
  handleChangePage,
  page,
  handleChangeRow,
  rows,
  handleOpenInvoiceModal,
  handleCloseInvoiceModal,
  openInvoiceModal,
  currentOrder,
}) => {
  return (
    <Fragment>
      <OrderTableContainer
        data={data}
        handleOpenModal={handleOpenModal}
        handleChangePage={handleChangePage}
        page={page}
        handleChangeRow={handleChangeRow}
        rows={rows}
        handleOpenInvoiceModal={handleOpenInvoiceModal}
      />
      <OrderStatusModal
        data={data}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        status={status}
        updateStatusAndHistoryState={updateStatusAndHistoryState}
        updateStatus={updateStatus}
      />
      <InvoiceDisplay
        handleOpenInvoiceModal={handleOpenInvoiceModal}
        handleCloseInvoiceModal={handleCloseInvoiceModal}
        openInvoiceModal={openInvoiceModal}
        currentOrder={currentOrder}
      />
    </Fragment>
  );
};

export default OrderList;
