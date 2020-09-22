import React, { Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useAuth0 } from "@auth0/auth0-react";

import { getProductsApi } from "../../api";

const OrderDetails = (props) => {
  const [products, setProducts] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  async function getProducts() {
    const token = await getAccessTokenSilently();
    const products = await getProductsApi(token);
    setProducts(products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  function addProductToOrderDetails(productId, name, quantity, price) {
    const totalPrice = price * quantity;
    props.handleProductStateChange({
      productId: productId,
      name: name,
      quantity: quantity,
      unitPrice: price,
      totalPrice: totalPrice,
    });
  }

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} md={6} key={product.id}>
            <TextField
              id={`product-${product.id}`}
              label={product.item_name}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                addProductToOrderDetails(
                  product.id,
                  product.item_name,
                  e.target.value,
                  product.price
                )
              }
              defaultValue={
                props.order.orderDetails.filter(
                  (x) => x.productId === product.id
                ).length === 1
                  ? props.order.orderDetails.find(
                      (x) => x.productId === product.id
                    ).quantity
                  : ""
              }
            />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default OrderDetails;
