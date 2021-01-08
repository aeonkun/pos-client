import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import useStyles from "./OrderFormStyles";
import * as Constants from "./constants/OrderFormConstants";
import { NumberFormatter } from "..";

export default function Review(props) {
  const classes = useStyles();

  function getTotal(orderDetails, deliveryCharge) {
    const productTotalPrices = orderDetails.map((x) => x.totalPrice);
    const totalPrice = (
      productTotalPrices.reduce((a, b) => a + b, 0) / 100 +
      parseFloat(deliveryCharge)
    ).toFixed(2);
    //multiply total price by 100 to get centavo equivalent
    return totalPrice;
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.order.orderDetails.map((order) => (
          <ListItem className={classes.listItem} key={order.id}>
            <ListItemText
              primary={order.name}
              secondary={`Quantity: ${order.quantity}`}
            />
            <Typography variant="body2">
              <NumberFormatter value={order.totalPrice / 100} />
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Delivery Charge" />
          <Typography variant="subtitle1" className={classes.total}>
            <NumberFormatter value={props.order.deliveryCharge / 100} />
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            <NumberFormatter
              value={getTotal(
                props.order.orderDetails,
                props.order.deliveryCharge
              )}
            />
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Customer Details
          </Typography>
          <Typography gutterBottom>
            {`Name: ${[props.order.firstName, props.order.lastName].join(" ")}`}
          </Typography>
          <Typography
            gutterBottom
          >{`Address: ${props.order.deliveryAddress}`}</Typography>
          <Typography
            gutterBottom
          >{`Landmark: ${props.order.nearbyLandmark}`}</Typography>
          <Typography
            gutterBottom
          >{`Notes: ${props.order.additionalNotes}`}</Typography>
          <Typography gutterBottom>{`Payment Method: ${
            Constants.paymentMethod[props.order.paymentMethod]
          }`}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
