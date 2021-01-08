import React from "react";
import { TableRow, TableHead, TableCell } from "@material-ui/core";
import useStyles from "./InventoryListStyles";

const InventoryTableHeader = () => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" className={classes.header}>
          Product Name
        </TableCell>
        <TableCell align="center" className={classes.header}>
          Stock On Hand
        </TableCell>
        <TableCell align="center" className={classes.header}>
          Committed Stock
        </TableCell>
        <TableCell align="center" className={classes.header}>
          Available Stock
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default InventoryTableHeader;
