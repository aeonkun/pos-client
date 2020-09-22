import axios from "axios";

const url = "http://localhost:5000";

export const getProductsApi = async (token) => {
  try {
    const { data } = await axios.get(url + "/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const submitOrderApi = async (
  token,
  {
    firstName,
    lastName,
    address,
    contactNumber,
    orderDetails,
    isPaid,
    status,
    createdBy,
  }
) => {
  try {
    await axios.post(
      url + "/orders",
      {
        firstName,
        lastName,
        address,
        contactNumber,
        orderDetails,
        isPaid,
        status,
        createdBy,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

export const createProductApi = async (token, { name, quantity, price }) => {
  try {
    const { data } = await axios.post(
      url + "/products",
      {
        name,
        quantity,
        price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteProductApi = async (token, id) => {
  try {
    const { data } = await axios.delete(url + `/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getOrdersApi = async (token) => {
  try {
    const { data } = await axios.get(url + "/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {}
};

export const getStatusHistoryApi = async (token, id) => {
  try {
    const { data } = await axios.get(url + `/orders/${id}/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const updatePaymentAndOrderStatusApi = async (
  token,
  id,
  newPaymentStatus,
  newOrderStatus,
  modifiedBy
) => {
  try {
    const { data } = await axios.put(
      url + `/orders/${id}/status`,
      {
        newPaymentStatus,
        newOrderStatus,
        modifiedBy,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {}
};
