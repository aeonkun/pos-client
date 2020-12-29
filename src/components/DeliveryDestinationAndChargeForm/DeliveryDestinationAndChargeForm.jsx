import React, { Fragment, useState } from "react";
import {
  CssBaseline,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import useStyles from "./DeliveryDestinationStyles";
import { createDeliveryDestinationAndChargeApi } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";

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

const DeliveryDestinationAndChargeForm = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  const [destination, setDestination] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const handleDestinationStateChange = (event) => {
    setDestination(event.target.value);
  };

  const handleDeliveryChargeChange = (event) => {
    setDeliveryCharge(event.target.value);
  };

  const createDeliveryDestinationAndCharge = async () => {
    const token = await getAccessTokenSilently();

    const value = parseFloat(deliveryCharge) * 100;

    const isSuccessfullyCreated = await createDeliveryDestinationAndChargeApi(
      token,
      destination,
      value,
      user.name
    );
    return isSuccessfullyCreated;
  };

  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h3" align="center">
            Add new destination
          </Typography>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="destination"
                  label="Destination"
                  fullWidth
                  onChange={handleDestinationStateChange}
                  value={destination}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="deliveryCharge"
                  label="Delivery Charge"
                  fullWidth
                  inputProps={{ min: "0" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleDeliveryChargeChange}
                  value={deliveryCharge}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={createDeliveryDestinationAndCharge}
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </main>
      {/* <Snackbar
    open={notification.open}
    autoHideDuration={6000}
    onClose={handleClose}
  >
    <Alert onClose={handleClose} severity={notification.status}>
      {notification.message}
    </Alert>
  </Snackbar> */}
    </Fragment>
  );
};

export default DeliveryDestinationAndChargeForm;
