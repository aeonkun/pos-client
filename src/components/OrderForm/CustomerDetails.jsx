import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, TextField, Select, MenuItem } from "@material-ui/core";
import NumberFormat from "react-number-format";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      decimalScale={2}
      isNumericString
      prefix="₱"
    />
  );
}

const CustomerDetails = ({
  handleStateChange,
  order,
  destinationsAndCharges,
  dateCreated,
  handleChangeDateCreatedState,
}) => {
  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="dateCreated"
              label="Date Created"
              value={dateCreated}
              onChange={handleChangeDateCreatedState}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KeyboardTimePicker
              margin="normal"
              id="timeCreated"
              label="Time Created"
              value={dateCreated}
              onChange={handleChangeDateCreatedState}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
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
            onChange={handleStateChange("firstName")}
            defaultValue={order.firstName}
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
            onChange={handleStateChange("lastName")}
            defaultValue={order.lastName}
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
            onChange={handleStateChange("deliveryAddress")}
            defaultValue={order.deliveryAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="nearbyLandmark"
            name="nearbyLandmark"
            label="Nearby Landmark"
            fullWidth
            autoComplete="nearby landmark"
            onChange={handleStateChange("nearbyLandmark")}
            defaultValue={order.nearbyLandmark}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="contactNumber"
            name="contactNumber"
            label="Contact Number"
            fullWidth
            onChange={handleStateChange("contactNumber")}
            defaultValue={order.contactNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">
            Municipality for delivery:
          </Typography>
          <Select
            labelId="municipality"
            id="municipality"
            value={order.municipality}
            fullWidth
            onChange={handleStateChange("municipality")}
          >
            {destinationsAndCharges.map((delivery) => (
              <MenuItem value={delivery.destination}>
                {delivery.destination}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="deliveryCharge"
            name="deliveryCharge"
            label="Delivery Charge"
            fullWidth
            onChange={handleStateChange("deliveryCharge")}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            value={order.deliveryCharge}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CustomerDetails;
