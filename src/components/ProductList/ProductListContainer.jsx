import React, { useState } from "react";
import { ProductList } from "../";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getProductsApi,
  updateProductApi,
  getProductHistoryApi,
} from "../../api";
import { Grid, CircularProgress } from "@material-ui/core";
import useSWR, { mutate } from "swr";
const ProductListContainer = () => {
  //-------------------- Authentication -----------------
  const { getAccessTokenSilently, user } = useAuth0();

  //-------------------- Modal Control -------------------
  const [modalOpen, setModalOpen] = useState(false);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const [modalProductHistory, setModalProductHistory] = useState([]);

  const handleOpenModal = async ({ id, itemName, price }) => {
    try {
      setModalProduct({ id, itemName, price });
      const token = await getAccessTokenSilently();
      const response = await getProductHistoryApi(token, id);
      setModalProductHistory(response);
      setModalOpen(true);
    } catch (error) {}
  };
  const handleOpenProductEditModal = async ({ id, itemName, price }) => {
    try {
      setModalProduct({ id, itemName, price });
      const token = await getAccessTokenSilently();
      const response = await getProductHistoryApi(token, id);
      setModalProductHistory(response);
      setEditProductModalOpen(true);
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalProduct({});
  };
  const handleCloseEditProductModal = () => {
    setEditProductModalOpen(false);
    setModalProduct({});
  };

  const handleModalProductUpdate = (input) => (event) => {
    setModalProduct({ ...modalProduct, [input]: event.target.value });
    console.log(modalProduct);
  };
  //--------------------------------------------------------

  const updateProduct = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await updateProductApi(
        token,
        modalProduct.id,
        modalProduct.itemName,
        modalProduct.price,
        user.name
      );
      console.log(response);
      if (response == true) {
        //Manually revalidate products
        mutate(url);
        setEditProductModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //-------------------- Product Retrieval ----------------
  const url = "/products";

  const getProducts = async () => {
    const token = await getAccessTokenSilently();
    const products = await getProductsApi(token);
    return products;
  };

  const { data, error } = useSWR(url, getProducts);
  //------------------------------------------------------------

  if (error) return <p>Error occured. Please refresh page.</p>;
  if (!data)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <ProductList
      data={data}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      modalOpen={modalOpen}
      modalProduct={modalProduct}
      modalProductHistory={modalProductHistory}
      handleModalProductUpdate={handleModalProductUpdate}
      updateProduct={updateProduct}
      editProductModalOpen={editProductModalOpen}
      handleOpenProductEditModal={handleOpenProductEditModal}
      handleCloseEditProductModal={handleCloseEditProductModal}
    />
  );
};

export default ProductListContainer;
