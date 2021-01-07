import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import useStyles from "./OrderListStyles";

const OrderTableHeader = () => {
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell align="center" className={classes.header}>
          Order ID
        </TableCell>
        <TableCell align="center" className={classes.header}>
          Customer Name
        </TableCell>
        <TableCell align="center" className={classes.header}>
          Payment Method
        </TableCell>
        <TableCell align="center" className={classes.header}>
          Total Price (₱)
        </TableCell>
        <TableCell align="center" className={classes.header}>
          Created By
        </TableCell>
        <TableCell align="center" className={classes.header}>
          Date Created
        </TableCell>
        <TableCell align="center" className={classes.header}>
          Status
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default OrderTableHeader;
