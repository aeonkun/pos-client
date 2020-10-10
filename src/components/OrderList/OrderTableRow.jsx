import React, { Fragment, useState } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import useStyles from "./OrderListStyles";

const OrderTableRow = ({ order, formatDateTime, handleOpenModal }) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{order.id}</TableCell>
        <TableCell align="center">
          {[order.customer.firstName, order.customer.lastName].join(" ")}
        </TableCell>
        <TableCell align="center">{order.customer.deliveryAddress}</TableCell>
        <TableCell align="center">
          {(order.totalPrice / 100).toFixed(2)}
        </TableCell>
        <TableCell align="center">{order.createdBy}</TableCell>
        <TableCell align="center">
          {formatDateTime(order.dateTimeCreated)}
        </TableCell>
        <TableCell align="center">{order.orderStatus}</TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleOpenModal(order.id)}
          >
            Update Status
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className={classes.header}>
                      Product Name
                    </TableCell>
                    <TableCell align="center" className={classes.header}>
                      Quantity
                    </TableCell>
                    <TableCell align="right" className={classes.header}>
                      Unit Price (₱)
                    </TableCell>
                    <TableCell align="right" className={classes.header}>
                      Total Price (₱)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderDetails !== null ? (
                    order.orderDetails.map((orderDetail) => (
                      <TableRow key={orderDetail.productId}>
                        <TableCell component="th" scope="row">
                          {orderDetail.productName}
                        </TableCell>
                        <TableCell align="center">
                          {orderDetail.quantity}
                        </TableCell>
                        <TableCell align="right">
                          {(orderDetail.unitPrice / 100).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {(
                            (orderDetail.unitPrice * orderDetail.quantity) /
                            100
                          ).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Typography
                      variant="h6"
                      align="center"
                      className={classes.warning}
                    >
                      No orders
                    </Typography>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default OrderTableRow;
