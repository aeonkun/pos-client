import React, { Fragment } from "react";
import { OrderTableContainer, OrderStatusModal } from "../";

const OrderList = ({
  data,
  openModal,
  handleOpenModal,
  handleCloseModal,
  status,
  updateStatusAndHistoryState,
  updateStatus,
}) => {
  return (
    <Fragment>
      <OrderTableContainer data={data} handleOpenModal={handleOpenModal} />
      <OrderStatusModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        status={status}
        updateStatusAndHistoryState={updateStatusAndHistoryState}
        updateStatus={updateStatus}
      />
    </Fragment>
  );
};

export default OrderList;
