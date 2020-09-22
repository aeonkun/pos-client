import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const CustomerDetails = (props) => {
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            onChange={props.handleStateChange("firstName")}
            defaultValue={props.order.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            onChange={props.handleStateChange("lastName")}
            defaultValue={props.order.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Shipping Address"
            fullWidth
            autoComplete="shipping address"
            onChange={props.handleStateChange("address")}
            defaultValue={props.order.address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="contactNumber"
            name="contactNumber"
            label="Contact Number"
            fullWidth
            onChange={props.handleStateChange("contactNumber")}
            defaultValue={props.order.contactNumber}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CustomerDetails;
