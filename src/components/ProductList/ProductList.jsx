import React, { useState, useEffect, Fragment } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import { useAuth0 } from "@auth0/auth0-react";
import { getProductsApi, deleteProductApi } from "../../api";
import { useStyles, StyledTableCell } from "./ProductListStyles";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const [notification, setNotification] = useState({
    status: "",
    message: "",
    open: false,
  });

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const token = await getAccessTokenSilently();
    const response = await getProductsApi(token);
    setProducts(response);
  }

  const deleteProduct = async (id) => {
    const token = await getAccessTokenSilently();
    const response = await deleteProductApi(token, id);
    console.log(response);
    openSnackbar(response);

    if (response.status === "success") {
      setProducts(products.filter((product) => product.id !== id));
    }
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

  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Product List
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>Price (₱)</StyledTableCell>
                  <StyledTableCell align="center">
                    <EditIcon />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <DeleteIcon />
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <StyledTableCell>{product.item_name}</StyledTableCell>
                    <StyledTableCell>{product.quantity}</StyledTableCell>
                    <StyledTableCell>{product.price / 100}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained" color="primary">
                        Edit
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

export default ProductList;
