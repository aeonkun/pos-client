import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import InvoiceTableFooter from "./InvoiceTableFooter";

const tableRowsCount = 10;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#000000",
  },
});

const InvoiceItemsTable = ({ currentOrder }) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    <InvoiceTableRow items={currentOrder.orderDetails} />
    <InvoiceTableBlankSpace
      rowsCount={tableRowsCount - currentOrder.orderDetails.length}
    />
    <InvoiceTableFooter currentOrder={currentOrder} />
  </View>
);

export default InvoiceItemsTable;
