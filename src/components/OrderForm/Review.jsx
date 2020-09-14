import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();

  function getTotal(orderDetails) {
    const productTotalPrices = orderDetails.map(x => x.totalPrice);

    return (productTotalPrices.reduce((a, b) => a+b,0) / 100).toFixed(2);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.order.orderDetails.map((order) => (
          <ListItem className={classes.listItem} key={order.id}>
            <ListItemText primary={order.name} secondary={`Quantity: ${order.quantity}`} />
            <Typography variant="body2">{(order.totalPrice / 100).toFixed(2)}</Typography>
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
          <Typography gutterBottom>{[props.order.firstName, props.order.lastName].join(' ')}</Typography>
          <Typography gutterBottom>{props.order.address}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}