import React, { Fragment, useState } from "react";
import { InventoryTable } from "../..";
import useSWR, { mutate } from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { getProductsApi } from "../../../api";
import { Grid, CircularProgress } from "@material-ui/core";

const InventoryList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    mutate(url);
  };

  const handleChangeRow = (event) => {
    setPage(1);
    setRows(event.target.value);
    mutate(url);
  };

  const url = "/inventory";

  const getProductInventory = async () => {
    const token = await getAccessTokenSilently();
    const products = await getProductsApi(token);
    return products;
  };

  const { data, error } = useSWR(url, getProductInventory);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  if (data.length === 0) return <div>No orders to show</div>;

  return (
    <Fragment>
      <InventoryTable data={data} />
    </Fragment>
  );
};

export default InventoryList;
