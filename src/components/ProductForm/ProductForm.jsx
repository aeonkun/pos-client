import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import useStyles from "./ProductFormStyles";

const ProductForm = ({
  handleStateChange,
  product,
  createProduct,
  notification,
  handleClose,
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
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
