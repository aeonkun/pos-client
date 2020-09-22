import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import {Link} from 'react-router-dom';


const components = [
    {
        id: 1,
        url: "/orders",
        name: "Orders",
        icon: <StorefrontIcon />
    },
    {
        id: 2,
        url: "/orders/create",
        name: "Create Order",
        icon: <AddShoppingCartIcon />
    },
    {
        id: 3,
        url: "/products",
        name: "Product List",
        icon: <LocalMallIcon />
    },
    {
        id: 4,
        url: "/products/create",
        name: "Add Product",
        icon: <PlaylistAddIcon />
    },
    
]

export const mainListItems = (

  <div>
    {components.map((component) => (
      <Link style={{ textDecoration: 'none', color: "black" }} to={component.url}>
      <ListItem button key={component.id}>
        <ListItemIcon>
          {component.icon}
        </ListItemIcon>
        <ListItemText primary={component.name}/>
      </ListItem>
    </Link>
    ))}
  </div>
);