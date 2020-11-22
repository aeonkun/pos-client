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
    const response = await createProductApi(token, product, user.name);
    openSnackbar(response);
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
      handleStateChange={handleStateChange}
      product={product}
      createProduct={createProduct}
      notification={notification}
      handleClose={handleClose}
    />
  );
};

export default ProductFormContainer;
