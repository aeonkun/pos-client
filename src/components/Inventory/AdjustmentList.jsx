import React, { Fragment, useState } from "react";
import useSWR, { mutate } from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { getInventoryAdjustmentsApi } from "../../api";
import { format } from "date-fns";
import useStyles from "./InventoryManagementStyles";
import { PageSelector } from "../";

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return format(date, "MM/dd/yyyy hh:mm:ss aa");
}

const AdjustmentList = () => {
  const classes = useStyles();

  const { getAccessTokenSilently, user } = useAuth0();

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    mutate(url);
  };

  const handleChangeRow = (event) => {
    setPage(1);
    setRows(event.target.value);
    mutate(url);
  };

  const getInventoryAdjustments = async (page, rows) => {
    const token = await getAccessTokenSilently();
    const inventoryAdjustments = await getInventoryAdjustmentsApi(
      token,
      page,
      rows
    );
    return inventoryAdjustments;
  };

  const url = `/inventories/adjustments/page=${page}&rows=${rows}`;
  const { data, error } = useSWR(url, () =>
    getInventoryAdjustments(page - 1, rows)
  );

  if (error) return <p>Error occured. Please refresh page.</p>;
  if (!data)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <Fragment>
      {data.adjustments.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <strong>Product Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Adjusted Value</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Adjusted By</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Date Adjusted</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Notes</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.adjustments.map((row) => (
                <TableRow>
                  <TableCell align="center">{row.product.itemName}</TableCell>
                  <TableCell align="center">
                    {row.adjustedStockOnHand}
                  </TableCell>
                  <TableCell align="center">{row.adjustedBy}</TableCell>
                  <TableCell align="center">
                    {formatDateTime(row.dateTimeAdjusted)}
                  </TableCell>
                  <TableCell align="center">{row.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PageSelector
            pages={data.pages}
            handleChangePage={handleChangePage}
            page={page}
            handleChangeRow={handleChangeRow}
            rows={rows}
          />
        </TableContainer>
      ) : (
        <p>No Adjustments</p>
      )}
    </Fragment>
  );
};

export default AdjustmentList;
