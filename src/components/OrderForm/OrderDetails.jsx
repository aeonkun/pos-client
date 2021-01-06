import React, { Fragment, useState, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

import { useAuth0 } from "@auth0/auth0-react";
import { getProductsApi } from "../../api";
import useSWR from "swr";
import * as Constants from "./constants/OrderFormConstants";

const OrderDetails = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const token = await getAccessTokenSilently();
      const products = await getProductsApi(token);
      setProducts(products);
    };
    getProducts();
    setLoading(false);
  }, []);

  const addProductToOrderDetails = (productId, name, quantity, price) => {
    const totalPrice = price * quantity;
    props.handleProductStateChange({
      productId: productId,
      name: name,
      quantity: quantity,
      price: price,
      totalPrice: totalPrice,
    });
  };

  if (loading)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
        </Grid>
        {products.map((product) => (
          <Grid item xs={12} md={6} key={product.id}>
            <TextField
              id={`product-${product.id}`}
              label={product.itemName}
              type="number"
              inputProps={{ min: "0" }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                addProductToOrderDetails(
                  product.id,
                  product.itemName,
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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom>
            Additional Details
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle2">Payment method:</Typography>
          <Select
            labelId="paymentMethod"
            id="paymentMethod"
            value={props.order.paymentMethod}
            fullWidth
            onChange={props.handleStateChange("paymentMethod")}
          >
            {Object.values(Constants.paymentMethod).map((method) => (
              <MenuItem
                value={Object.keys(Constants.paymentMethod).find(
                  (key) => Constants.paymentMethod[key] === method
                )}
              >
                {method}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="additionalNotes"
            name="additionalNotes"
            label="Additional Notes"
            fullWidth
            autoComplete="additional notes"
            onChange={props.handleStateChange("additionalNotes")}
            defaultValue={props.order.additionalNotes}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default OrderDetails;
