import React, { Fragment, useEffect, useState } from "react";
import { getProductTransactionsApi } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import { format } from "date-fns";
import useStyles from "./ProductListStyles";

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return format(date, "MM/dd/yyyy hh:mm:ss aa");
}

const ProductTransactions = ({ modalProduct }) => {
  const classes = useStyles();

  const { getAccessTokenSilently } = useAuth0();

  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const getProductTransactions = async () => {
      const token = await getAccessTokenSilently();
      const response = await getProductTransactionsApi(token, modalProduct.id);
      setTransactions(response);
    };

    getProductTransactions();
  }, []);

  console.log(transactions);
  if (!transactions) return <div>Loading...</div>;
  return (
    <Fragment>
      {transactions.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>OrderNo.</TableCell>
                <TableCell align="center">Customer Name</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Date Created</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.orderId}</TableCell>
                  <TableCell align="center">{row.customerName}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">
                    {(row.total / 100).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    {formatDateTime(row.dateTimeCreated)}
                  </TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No transactions</p>
      )}
    </Fragment>
  );
};

export default ProductTransactions;
