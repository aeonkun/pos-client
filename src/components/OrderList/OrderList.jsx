import React, { useState, useEffect, Fragment } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getOrdersApi,
  getStatusHistoryApi,
  updatePaymentAndOrderStatusApi,
} from "../../api";
import { format } from "date-fns";
import OrderStatusModal from "./OrderStatusModal";
import useStyles from "./OrderListStyles";

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return format(date, "MM/dd/yyyy hh:mm:ss aa");
}

function Row(props) {
  const { order } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell align="center">{order.paymentStatus}</TableCell>
        <TableCell align="center">{order.orderStatus}</TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => props.handleOpen(order.id)}
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
                      align="left"
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
}

const OrderList = (props) => {
  const { getAccessTokenSilently, user } = useAuth0();

  const [loadData, setLoadData] = useState(true);
  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState({
    paymentStatus: "",
    orderStatus: "",
    statusHistories: [],
  });

  useEffect(() => {
    getOrders();
  }, []);

  const handleOpen = async (id) => {
    await getStatusAndHistory(id);
    setOpenModal(true);
  };

  const handleClose = (source) => {
    setOpenModal(false);
    console.log(`close: ${openModal}, source: ${source}`);
  };

  const getStatusAndHistory = async (id) => {
    const token = await getAccessTokenSilently();
    const response = await getStatusHistoryApi(token, id);
    setStatus(response.statusandhistory);
    console.log(status);
  };

  async function getOrders() {
    const token = await getAccessTokenSilently();
    const orderList = await getOrdersApi(token);
    setOrders(orderList);
    console.log(orderList);
  }

  const updateStatusInOrderList = (id, paymentStatus, orderStatus) => {
    let currentOrder = orders.find((o) => o.id == id);
    if (currentOrder) {
      currentOrder.paymentStatus = paymentStatus;
      currentOrder.orderStatus = orderStatus;
    }
  };

  const updateStatusAndHistoryState = (input) => (e) => {
    setStatus({ ...status, [input]: e.target.value });
    console.log(status);
  };

  const updateStatus = async () => {
    const token = await getAccessTokenSilently();
    const paymentAndOrderStatusResponse = await updatePaymentAndOrderStatusApi(
      token,
      status.id,
      status.paymentStatus,
      status.orderStatus,
      user.name
    );
    console.log(paymentAndOrderStatusResponse);
    await getStatusAndHistory(status.id);
    updateStatusInOrderList(
      status.id,
      status.paymentStatus,
      status.orderStatus
    );
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Fragment>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center" className={classes.header}>
                  Order ID
                </TableCell>
                <TableCell align="center" className={classes.header}>
                  Customer Name
                </TableCell>
                <TableCell align="center" className={classes.header}>
                  Delivery Address
                </TableCell>
                <TableCell align="center" className={classes.header}>
                  Total Price (₱)
                </TableCell>
                <TableCell align="center" className={classes.header}>
                  Created By
                </TableCell>
                <TableCell align="center" className={classes.header}>
                  Date Created
                </TableCell>
                <TableCell align="center" className={classes.header}>
                  Payment Status
                </TableCell>
                <TableCell align="center" className={classes.header}>
                  Order Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders !== null ? (
                orders.map((order) => (
                  <Row
                    key={order.name}
                    order={order}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                  />
                ))
              ) : (
                <p>No orders</p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
      <Fragment>
        <OrderStatusModal
          openModal={openModal}
          handleClose={handleClose}
          status={status}
          updateStatusAndHistoryState={updateStatusAndHistoryState}
          updateStatus={updateStatus}
        />
      </Fragment>
    </Fragment>
  );
};

export default OrderList;
