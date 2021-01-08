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
import useStyles from "./OrderListStyles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import * as PaymentMethodConstants from "../OrderForm/constants/OrderFormConstants";
import * as OrderStatusConstants from "./constants/OrderListConstants";
import UpdateIcon from "@material-ui/icons/Update";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { List, ListItem, ListItemText, Grid } from "@material-ui/core";
import { NumberFormatter } from "..";

const OrderTableRow = ({
  order,
  formatDateTime,
  handleOpenModal,
  handleOpenInvoiceModal,
}) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  return (
    <Fragment>
      <TableRow className={classes.root}>
        {order.hasStockIssues === true && (
          <TableCell>
            <ErrorOutlineIcon color="error"></ErrorOutlineIcon>
          </TableCell>
        )}
        {order.hasStockIssues === false && <TableCell />}
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
        <TableCell align="center">
          {PaymentMethodConstants.paymentMethod[order.paymentMethod]}
        </TableCell>
        <TableCell align="center">
          <NumberFormatter value={order.totalPrice / 100} />
        </TableCell>
        <TableCell align="center">{order.createdBy}</TableCell>
        <TableCell align="center">
          {formatDateTime(order.dateTimeCreated)}
        </TableCell>
        <TableCell align="center">
          {OrderStatusConstants.orderStatuses[order.orderStatus]}
        </TableCell>
        <TableCell align="center">
          <IconButton color="primary" onClick={() => handleOpenModal(order.id)}>
            <UpdateIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleOpenInvoiceModal(order.id)}
          >
            <ReceiptIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <List>
                <Grid container direction="row" spacing={3}>
                  <Grid item>
                    <ListItem>
                      <ListItemText
                        primary={order.customer.deliveryAddress}
                        secondary="Delivery Address"
                      />
                    </ListItem>
                  </Grid>
                  <Grid item>
                    <ListItem>
                      <ListItemText
                        primary={
                          order.customer.nearbyLandmark
                            ? order.customer.nearbyLandmark
                            : "No landmark specified"
                        }
                        secondary="Landmark"
                      />
                    </ListItem>
                  </Grid>
                  <Grid item>
                    <ListItem>
                      <ListItemText
                        primary={
                          order.additionalNotes
                            ? order.additionalNotes
                            : "No notes specified"
                        }
                        secondary="Notes"
                      />
                    </ListItem>
                  </Grid>
                </Grid>
              </List>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell />
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
                    order.orderDetails.map((orderDetail, i, arr) => (
                      <Fragment>
                        <TableRow key={orderDetail.productId}>
                          {orderDetail.hasEnoughStock === false && (
                            <TableCell>
                              <ErrorOutlineIcon color="error"></ErrorOutlineIcon>
                            </TableCell>
                          )}
                          {orderDetail.hasEnoughStock === true && <TableCell />}
                          <TableCell component="th" scope="row">
                            {orderDetail.productName}
                          </TableCell>
                          <TableCell align="center">
                            {orderDetail.quantity}
                          </TableCell>
                          <TableCell align="right">
                            <NumberFormatter value={orderDetail.price / 100} />
                          </TableCell>
                          <TableCell align="right">
                            <NumberFormatter value={orderDetail.total / 100} />
                          </TableCell>
                        </TableRow>
                        {arr.length - 1 === i && (
                          <Fragment>
                            <TableRow>
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell
                                align="right"
                                className={classes.header}
                              >
                                Delivery Charge:
                              </TableCell>
                              <TableCell align="right">
                                <NumberFormatter
                                  value={order.deliveryCharge / 100}
                                ></NumberFormatter>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell
                                align="right"
                                className={classes.header}
                              >
                                Total:
                              </TableCell>
                              <TableCell align="right">
                                <NumberFormatter
                                  value={order.totalPrice / 100}
                                />
                              </TableCell>
                            </TableRow>
                          </Fragment>
                        )}
                      </Fragment>
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
