import axios from "axios";
import { format } from "date-fns";

//local api
// const url = "http://localhost:8080/api/v1";

// server api
const url = "https://rizalventures.org/oms/api/v1";

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

export const getProductByIdApi = async (token, id) => {
  try {
    const { data } = await axios.get(url + `/products/${id}`, {
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
    deliveryAddress,
    contactNumber,
    nearbyLandmark,
    orderDetails,
    status,
    createdBy,
    paymentMethod,
    additionalNotes,
    deliveryCharge,
    municipality,
    dateTimeCreated,
  }
) => {
  try {
    console.log("in api");
    console.log(dateTimeCreated);

    const { data } = await axios.post(
      url + "/orders",
      {
        customer: {
          firstName,
          lastName,
          deliveryAddress,
          contactNumber,
          nearbyLandmark,
        },
        orderDetails,
        paymentMethod,
        additionalNotes,
        status,
        createdBy,
        deliveryCharge: parseFloat(deliveryCharge) * 100,
        municipality,
        dateTimeCreated: format(dateTimeCreated, `yyyy-MM-dd'T'HH:mm:ss'Z'`),
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

export const createProductApi = async (
  token,
  { itemName, stockOnHand, price },
  userName
) => {
  try {
    const createdBy = userName;
    stockOnHand = parseInt(stockOnHand);
    price = parseInt(price);
    const { data } = await axios.post(
      url + "/products",
      {
        itemName,
        stockOnHand,
        price,
        createdBy,
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

export const getOrdersApi = async (token, page, rows) => {
  try {
    const { data } = await axios.get(url + "/orders", {
      params: { page: Number(page), rows: Number(rows) },

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

export const getOrderByIdApi = async (token, id) => {
  try {
    const { data } = await axios.get(url + `/orders/${id}`, {
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
  orderId,
  orderStatus,
  username
) => {
  try {
    const id = orderId;
    const { data } = await axios.put(
      url + `/orders/${id}/status`,
      {
        orderStatus,
        username,
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

export const getIncomeApi = async (token) => {
  try {
    const { data } = await axios.get(`${url}/analytics/orders/income`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductApi = async (
  token,
  id,
  itemName,
  price,
  userName
) => {
  try {
    const modifiedBy = userName;
    const { data } = await axios.put(
      `${url}/products/${id}`,
      { itemName, price, modifiedBy },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductHistoryApi = async (token, id) => {
  try {
    const { data } = await axios.get(`${url}/products/${id}/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductTransactionsApi = async (token, id) => {
  try {
    const { data } = await axios.get(`${url}/products/${id}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const adjustInventoryApi = async (
  token,
  adjustedBy,
  productId,
  adjustedStockOnHand,
  notes
) => {
  try {
    const { data } = await axios.post(
      `${url}/inventories/${productId}/adjustments/create`,
      { adjustedBy, product: { id: productId }, adjustedStockOnHand, notes },
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
export const getInventoryAdjustmentsApi = async (token, page, rows) => {
  try {
    const { data } = await axios.get(`${url}/inventories/adjustments`, {
      params: { page: Number(page), rows: Number(rows) },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const getOrderActivityApi = async (token, timeUnit) => {
  try {
    const { data } = await axios.get(`${url}/analytics/orderactivity`, {
      params: { timeUnit: timeUnit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const getSalesActivitySummaryApi = async (token, timeUnit) => {
  try {
    const { data } = await axios.get(`${url}/analytics/salesactivity`, {
      params: { timeUnit: timeUnit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const getProductSalesApi = async (token, timeUnit) => {
  try {
    const { data } = await axios.get(`${url}/analytics/productsales`, {
      params: { timeUnit: timeUnit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const getDeliveryDestinationsAndChargesApi = async (token) => {
  try {
    const { data } = await axios.get(`${url}/delivery/destinations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const createDeliveryDestinationAndChargeApi = async (
  token,
  destination,
  deliveryCharge,
  createdBy
) => {
  try {
    const { data } = await axios.post(
      `${url}/delivery/destinations/create`,
      { destination, deliveryCharge, createdBy },
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
