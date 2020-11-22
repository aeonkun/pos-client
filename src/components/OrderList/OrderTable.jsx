import React, { Fragment } from "react";
import { OrderTableHeader, OrderTableRow, PageSelector } from "../";
import { Table, TableContainer, TableBody, Paper } from "@material-ui/core";

const OrderTable = ({
  data,
  handleOpenInvoice,
  handleClose,
  handleOpenModal,
  formatDateTime,
  handleChangePage,
  page,
  handleChangeRow,
  rows,
}) => {
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <OrderTableHeader />
          <TableBody>
            {data.orders !== null ? (
              data.orders.map((order) => (
                <OrderTableRow
                  key={order.id}
                  handleOpenInvoice={handleOpenInvoice}
                  order={order}
                  handleOpenModal={handleOpenModal}
                  handleClose={handleClose}
                  formatDateTime={formatDateTime}
                />
              ))
            ) : (
              <p>No orders</p>
            )}
          </TableBody>
        </Table>
        <PageSelector
          pages={data.pages}
          handleChangePage={handleChangePage}
          page={page}
          handleChangeRow={handleChangeRow}
          rows={rows}
        />
      </TableContainer>
    </Fragment>
  );
};

export default OrderTable;
