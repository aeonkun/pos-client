import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#000000";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  description: {
    width: "60%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  rate: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.productId.toString()}>
      <Text style={styles.description}>{item.productName}</Text>
      <Text style={styles.qty}>{item.quantity}</Text>
      <Text style={styles.rate}>{(item.price / 100).toFixed(2)}</Text>
      <Text style={styles.amount}>{(item.total / 100).toFixed(2)}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
