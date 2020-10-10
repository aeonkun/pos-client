import React, { useState } from "react";
import { OrderList } from "../";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getOrdersApi,
  getStatusHistoryApi,
  updatePaymentAndOrderStatusApi,
} from "../../api";
import useSWR from "swr";

const OrderListContainer = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState({
    paymentStatus: "",
    orderStatus: "",
    statusHistories: [],
  });

  const handleOpenModal = async (id) => {
    await getStatusAndHistory(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getStatusAndHistory = async (id) => {
    const token = await getAccessTokenSilently();
    const response = await getStatusHistoryApi(token, id);
    setStatus(response.statusandhistory);
  };

  const getOrders = async () => {
    const token = await getAccessTokenSilently();
    const orderList = await getOrdersApi(token);
    return orderList;
  };

  //test
  const { data, error } = useSWR("http://localhost:5000/orders", getOrders);

  const updateStatusInOrderList = (id, orderStatus) => {
    let currentOrder = data.response.orders.find((o) => o.id === id);
    if (currentOrder) {
      currentOrder.orderStatus = orderStatus;
    }
  };

  const updateStatusAndHistoryState = (input) => (e) => {
    setStatus({ ...status, [input]: e.target.value });
    console.log(status);
  };

  const updateStatus = async () => {
    const token = await getAccessTokenSilently();
    await updatePaymentAndOrderStatusApi(
      token,
      status.id,
      status.orderStatus,
      user.name
    );
    await getStatusAndHistory(status.id);
    updateStatusInOrderList(status.id, status.orderStatus);
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  if (data.total == 0) return <div>No orders to show</div>;

  return (
    <OrderList
      data={data}
      openModal={openModal}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      status={status}
      updateStatusAndHistoryState={updateStatusAndHistoryState}
      updateStatus={updateStatus}
    />
  );
};

export default OrderListContainer;
