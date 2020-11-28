import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    width: 60,
  },
});

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return format(date, "MM/dd/yyyy");
}

const InvoiceNo = ({ invoice, currentOrder }) => (
  <Fragment>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Invoice No:</Text>
      <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date: </Text>
      <Text>{formatDateTime(currentOrder.dateTimeCreated)}</Text>
    </View>
  </Fragment>
);

export default InvoiceNo;
