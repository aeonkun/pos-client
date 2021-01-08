import React, { Fragment } from "react";
import { OrderTableHeader, OrderTableRow, PageSelector } from "../";
import { Table, TableContainer, TableBody, Paper } from "@material-ui/core";

const OrderTable = ({
  data,
  handleClose,
  handleOpenModal,
  formatDateTime,
  handleChangePage,
  page,
  handleChangeRow,
  rows,
  handleOpenInvoiceModal,
}) => {
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <OrderTableHeader />
          <TableBody>
            {data.orders !== null ? (
              data.orders.map((order) => (
                <OrderTableRow
                  key={order.id}
                  order={order}
                  handleOpenModal={handleOpenModal}
                  handleClose={handleClose}
                  formatDateTime={formatDateTime}
                  handleOpenInvoiceModal={handleOpenInvoiceModal}
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
