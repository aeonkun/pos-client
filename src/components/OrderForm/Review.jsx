import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import useStyles from "./OrderFormStyles";

export default function Review(props) {
  const classes = useStyles();

  function getTotal(orderDetails) {
    const productTotalPrices = orderDetails.map((x) => x.totalPrice);
    const totalPrice = (
      productTotalPrices.reduce((a, b) => a + b, 0) / 100
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
              {(order.totalPrice / 100).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {`₱ ${getTotal(props.order.orderDetails)}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Customer Details
          </Typography>
          <Typography gutterBottom>
            {[props.order.firstName, props.order.lastName].join(" ")}
          </Typography>
          <Typography gutterBottom>{props.order.address}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
