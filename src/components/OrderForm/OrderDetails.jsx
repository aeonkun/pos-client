import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { useAuth0 } from "@auth0/auth0-react";
import { getProductsApi } from "../../api";
import useSWR from "swr";
import * as Constants from "./constants/OrderFormConstants";

const OrderDetails = (props) => {
  const { getAccessTokenSilently } = useAuth0();

  const getProducts = async () => {
    const token = await getAccessTokenSilently();
    const products = await getProductsApi(token);
    return products;
  };

  const url = "/products";
  const { data, error } = useSWR(url, getProducts);

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

  if (error) return <p>Error occured</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
        </Grid>
        {data.map((product) => (
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
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
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
