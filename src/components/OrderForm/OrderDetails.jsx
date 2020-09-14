import React, {Fragment, useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { getProductsApi } from '../../api';


const OrderDetails = (props) => {

  const [products, setProducts] = useState([]);

  async function getProducts () {
    const products = await getProductsApi();
    setProducts(products);
}

useEffect(() => {
  getProducts();
}, [])


function addProduct(id, name, quantity, price) {

  const totalPrice = price * quantity;

  props.handleProductStateChange({
    id: id,
    name: name,
    quantity: quantity,
    unitPrice: price,
    totalPrice: totalPrice
  });
}

  return <Fragment>
  <Typography variant="h6" gutterBottom>
    Products
  </Typography>
  <Grid container spacing={3}>
  {
    products.map((product) => (
      <Grid item xs={12} md={6} key={product.id}>
        <TextField
          id={`product-${product.id}`}
          label={product.item_name}
          type="number"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={ e => addProduct(product.id, product.item_name, e.target.value, product.price)}
          defaultValue={props.order.orderDetails.filter(x => x.id === product.id).length === 1 ? props.order.orderDetails.find(x => x.id === product.id).quantity : ""}
        />
      </Grid>
    ))
  }
  </Grid>
</Fragment>
}

export default OrderDetails;