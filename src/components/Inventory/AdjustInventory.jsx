import React, { Fragment, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Select,
  MenuItem,
  CssBaseline,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import useStyles from "./AdjustInventoryStyles";
import { getProductsApi, adjustInventoryApi } from "../../api";
import useSWR, { mutate } from "swr";
import { useAuth0 } from "@auth0/auth0-react";

const AdjustInventory = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [adjustedStockOnHand, setAdjustedStockOnHand] = useState(0);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    mutate(url);
  }, []);

  const handleChangeCurrentProduct = (event) => {
    console.log(event.target.value);
    if (event.target.value === "default") {
      setCurrentProduct(null);
      setAdjustedStockOnHand(0);
    } else {
      setCurrentProduct(
        products.find((product) => product.id === event.target.value)
      );
    }

    console.log(currentProduct);
  };
  const handleChangeStockOnHand = (event) => {
    setAdjustedStockOnHand(event.target.value);
    console.log(adjustedStockOnHand);
  };
  const handleChangeNotes = (event) => {
    setNotes(event.target.value);
    console.log(notes);
  };

  const getProducts = async () => {
    const token = await getAccessTokenSilently();
    const response = await getProductsApi(token);
    setProducts(response);
    return response;
  };

  const adjustInventory = async () => {
    const token = await getAccessTokenSilently();
    const response = await adjustInventoryApi(
      token,
      user.name,
      currentProduct.id,
      adjustedStockOnHand,
      notes
    );
    mutate(url);
    setAdjustedStockOnHand(0);

    return response;
  };

  const url = `/products`;
  const { data, error } = useSWR(url, getProducts);

  const classes = useStyles();

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  if (data.length === 0) return <div>No products to show</div>;

  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Adjust Inventory
          </Typography>
          <form noValidate autoComplete="off">
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Typography variant="body1">Product Name: </Typography>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  defaultValue={"default"}
                  fullWidth
                  onChange={handleChangeCurrentProduct}
                >
                  <MenuItem value={"default"}>No Product Selected</MenuItem>

                  {data.map((product) => (
                    <MenuItem value={product.id}>{product.itemName}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-number"
                  label="Current stock on hand:"
                  fullWidth
                  inputProps={{ min: "0" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  value={
                    currentProduct !== null ? currentProduct.stockOnHand : 0
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="standard-number"
                  label="Adjust to:"
                  fullWidth
                  type="number"
                  inputProps={{ min: "0" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={currentProduct === null ? true : false}
                  value={adjustedStockOnHand}
                  onChange={handleChangeStockOnHand}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Notes"
                  multiline
                  fullWidth
                  rows={4}
                  placeholder="Add notes here"
                  variant="outlined"
                  onChange={handleChangeNotes}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={currentProduct === null ? true : false}
                  onClick={adjustInventory}
                >
                  Adjust
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    </Fragment>
  );
};

export default AdjustInventory;
