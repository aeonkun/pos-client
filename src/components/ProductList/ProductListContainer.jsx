import React, { useState } from "react";
import { ProductList } from "../";
import { useAuth0 } from "@auth0/auth0-react";
import { getProductsApi } from "../../api";
import useSWR from "swr";
const ProductListContainer = () => {
  //-------------------- Authentication -----------------
  const { getAccessTokenSilently } = useAuth0();
  //-----------------------------------------------------

  //-------------------- Modal Control -------------------
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalProduct, setModalProduct] = useState({});

  const handleOpenModal = ({ id, item_name, quantity, price }) => {
    setModalProduct({ id, item_name, quantity, price });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalProduct({});
  };
  //--------------------------------------------------------

  //-------------------- Product Retrieval ----------------
  const url = "/products";

  const getProducts = async () => {
    try {
      const token = await getAccessTokenSilently();
      const products = await getProductsApi(token);
      return products;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error } = useSWR(url, getProducts);
  //------------------------------------------------------------

  if (error) return <p>Error occured. Please refresh page.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <ProductList
      data={data}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      modalOpen={modalOpen}
      modalProduct={modalProduct}
    />
  );
};

export default ProductListContainer;
