import React, { Fragment } from "react";
import { TableRow, TableCell } from "@material-ui/core";

const InventoryTableRow = ({ inventory }) => {
  return (
    <Fragment>
      <TableRow>
        <TableCell align="center">{inventory.itemName}</TableCell>
        <TableCell align="center">{inventory.stockOnHand}</TableCell>
        <TableCell align="center">{inventory.committedStock}</TableCell>
        <TableCell align="center">{inventory.availableStock}</TableCell>
      </TableRow>
    </Fragment>
  );
};

export default InventoryTableRow;
