import React, { useState } from "react";
import { OrderList } from "../";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getOrderByIdApi,
  getOrdersApi,
  getStatusHistoryApi,
  updatePaymentAndOrderStatusApi,
} from "../../api";
import { CircularProgress, Grid } from "@material-ui/core";
import useSWR, { mutate } from "swr";

const OrderListContainer = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(5);
  const [status, setStatus] = useState({
    orderId: null,
    orderStatus: "",
    statusAndHistories: [],
  });
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleOpenInvoiceModal = async (orderId) => {
    setCurrentOrder(data.orders.find((order) => order.id === orderId));
    setOpenInvoiceModal(true);
  };

  const handleCloseInvoiceModal = () => {
    setOpenInvoiceModal(false);
  };

  const handleOpenModal = async (id) => {
    await getOrderById(id);
    await getStatusAndHistory(id);

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    mutate(url);
  };

  const handleChangeRow = (event) => {
    setPage(1);
    setRows(event.target.value);
    mutate(url);
  };

  const getStatusAndHistory = async (id) => {
    const token = await getAccessTokenSilently();
    const response = await getStatusHistoryApi(token, id);
    status.orderId = id;
    setStatus({ ...response, orderId: id });
  };

  const getOrders = async (page, rows) => {
    const token = await getAccessTokenSilently();
    const orderList = await getOrdersApi(token, page, rows);
    return orderList;
  };

  const getOrderById = async (id) => {
    const token = await getAccessTokenSilently();
    const order = await getOrderByIdApi(token, id);
    setCurrentOrder(order);

    return order;
  };

  const url = `/orders/page=${page}&rows=${rows}`;
  const { data, error } = useSWR(url, () => getOrders(page - 1, rows));

  const updateStatusAndHistoryState = (input) => (e) => {
    setStatus({ ...status, [input]: e.target.value });
  };

  const updateStatus = async (orderId) => {
    const token = await getAccessTokenSilently();
    const username = user.name;

    await updatePaymentAndOrderStatusApi(
      token,
      orderId,
      status.orderStatus,
      username
    );
    await getStatusAndHistory(status.orderId);
    mutate(url);
  };

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  if (data.orders.length === 0) return <div>No orders to show</div>;

  return (
    <OrderList
      data={data}
      openModal={openModal}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      status={status}
      updateStatusAndHistoryState={updateStatusAndHistoryState}
      updateStatus={updateStatus}
      handleChangePage={handleChangePage}
      page={page}
      handleChangeRow={handleChangeRow}
      rows={rows}
      handleOpenInvoiceModal={handleOpenInvoiceModal}
      handleCloseInvoiceModal={handleCloseInvoiceModal}
      openInvoiceModal={openInvoiceModal}
      currentOrder={currentOrder}
    />
  );
};

export default OrderListContainer;
