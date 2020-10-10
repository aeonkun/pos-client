import React, { Fragment } from "react";
import { OrderTableHeader, OrderTableRow } from "../";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

const OrderTable = ({ data, handleClose, handleOpenModal, formatDateTime }) => {
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <OrderTableHeader />
          <TableBody>
            {data !== null ? (
              data.response.orders.map((order) => (
                <OrderTableRow
                  key={order.id}
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
      </TableContainer>
    </Fragment>
  );
};

export default OrderTable;
