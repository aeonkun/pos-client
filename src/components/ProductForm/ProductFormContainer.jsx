import React, { useState } from "react";
import { ProductForm } from "../";
import { createProductApi } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";

const ProductFormContainer = () => {
  const [product, setProduct] = useState({
    itemName: "",
    price: "",
    stockOnHand: "",
  });

  const [itemName, setItemName] = useState(null);
  const [price, setPrice] = useState(null);
  const [stockOnHand, setStockOnHand] = useState(null);

  const handleItemNameStateChange = (event) => {
    setItemName(event.target.value);
  };

  const handlePriceStateChange = (event) => {
    setPrice(parseFloat(event.target.value));
    console.log(price);
  };

  const handleStockOnHandStateChange = (event) => {
    setStockOnHand(event.target.value);
  };

  const clearStates = () => {
    setItemName("");
    setPrice(null);
    setStockOnHand("");
  };

  const [notification, setNotification] = useState({
    status: "",
    message: "",
    open: false,
  });

  const { user, getAccessTokenSilently } = useAuth0();

  const handleStateChange = (input) => (e) => {
    setProduct({ ...product, [input]: e.target.value });
  };

  const createProduct = async () => {
    const token = await getAccessTokenSilently();
    const testProduct = { itemName, price: price * 100, stockOnHand };
    const response = await createProductApi(token, testProduct, user.name);
    openSnackbar(response);
    clearStates();
    clearProductState();
  };

  const openSnackbar = ({ status, message }) => {
    setNotification({
      status,
      message,
      open: true,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    clearNotification();
  };

  const clearNotification = () => {
    setNotification({
      open: false,
      status: notification.status,
      message: "",
    });
  };

  const clearProductState = () => {
    setProduct({
      itemName: "",
      price: "",
      stockOnHand: "",
    });
  };

  return (
    <ProductForm
      itemName={itemName}
      price={price}
      stockOnHand={stockOnHand}
      handleItemNameStateChange={handleItemNameStateChange}
      handlePriceStateChange={handlePriceStateChange}
      handleStockOnHandStateChange={handleStockOnHandStateChange}
      clearStates={clearStates}
      handleStateChange={handleStateChange}
      product={product}
      createProduct={createProduct}
      notification={notification}
      handleClose={handleClose}
    />
  );
};

export default ProductFormContainer;
