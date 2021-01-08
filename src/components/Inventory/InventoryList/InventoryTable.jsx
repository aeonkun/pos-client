import React from "react";
import { Table, TableContainer, TableBody, Paper } from "@material-ui/core";
import InventoryTableHeader from "./InventoryTableHeader";
import InventoryTableRow from "./InventoryTableRow";

const InventoryTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <InventoryTableHeader />
        <TableBody>
          {data != null ? (
            data.map((inventory) => <InventoryTableRow inventory={inventory} />)
          ) : (
            <p>No data to display</p>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
