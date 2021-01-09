import React, { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Grid, CircularProgress, Paper } from "@material-ui/core";
import { getProductByIdApi } from "../../api";
import useStyles from "./ProductListStyles";
import { format } from "date-fns";
import { NumberFormatter } from "..";

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return format(date, "MM/dd/yyyy hh:mm:ss aa");
}

const ProductOverview = ({ modalProduct }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const getProductById = async (id) => {
      const token = await getAccessTokenSilently();
      const productResponse = await getProductByIdApi(token, id);
      setProductDetails(productResponse);
    };

    getProductById(modalProduct.id);
  }, []);

  const classes = useStyles();

  if (!productDetails)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  return (
    <Fragment>
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Item Name
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              {productDetails.itemName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Item Price
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              {<NumberFormatter value={productDetails.price / 100} />}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Date Created
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              {productDetails.dateTimeCreated
                ? formatDateTime(productDetails.dateTimeCreated)
                : "null"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Created by
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              {productDetails.createdBy}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Last modified date
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              {productDetails.dateTimeModified
                ? formatDateTime(productDetails.dateTimeModified)
                : "No modifications"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Last modified by
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              {productDetails.modifiedBy}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default ProductOverview;
