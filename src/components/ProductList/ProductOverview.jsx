import React, { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Grid } from "@material-ui/core";
import useSWR, { mutate } from "swr";
import { getProductByIdApi } from "../../api";
import { format } from "date-fns";

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
      console.log(productResponse);
      setProductDetails(productResponse);
    };

    getProductById(modalProduct.id);
  }, []);

  if (!productDetails) return <div>Loading... </div>;
  console.log(productDetails.itemName);
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="subtitle1" color="textSecondary">
            Item Name
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{productDetails.itemName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" color="textSecondary">
            Item Price
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {(productDetails.price / 100).toFixed(2)}
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
              : "null"}
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
    </Fragment>
  );
};

export default ProductOverview;
