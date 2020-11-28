import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const concatenateName = (firstName, lastName) => {
  return firstName + " " + lastName;
};

const BillTo = ({ customer }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>{concatenateName(customer.firstName, customer.lastName)}</Text>
    <Text>{customer.deliveryAddress}</Text>
    <Text>{customer.contactNumber}</Text>
  </View>
);

export default BillTo;
