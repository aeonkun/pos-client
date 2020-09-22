import React, { useState, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import { createProductApi } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";
import useStyles from "./ProductFormStyles";

const ProductForm = () => {
  const classes = useStyles();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const [notification, setNotification] = useState({
    status: "",
    message: "",
    open: false,
  });

  const { getAccessTokenSilently } = useAuth0();

  const handleStateChange = (input) => (e) => {
    setProduct({ ...product, [input]: e.target.value });
  };

  const createProduct = async () => {
    const token = await getAccessTokenSilently();
    const response = await createProductApi(token, product);
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
      name: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Add Product
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create New Product
          </Typography>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="standard-required"
                  label="Product Name"
                  fullWidth
                  onChange={handleStateChange("name")}
                  value={product.name}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="standard-number"
                  label="Price"
                  fullWidth
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleStateChange("price")}
                  value={product.price}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="standard-number"
                  label="Quantity"
                  type="number"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleStateChange("quantity")}
                  value={product.quantity}
                />
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={createProduct}
              >
                Add Product
              </Button>
            </div>
          </form>
        </Paper>
      </main>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={notification.status}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default ProductForm;
