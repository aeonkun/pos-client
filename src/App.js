import React from 'react';

import clsx from 'clsx';
import { makeStyles, ThemeProvider, withTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

import { OrderForm, OrderList, ProductForm, UserList, UserRegistration, UserLogin, ProductList } from './components';
import styles from './App.module.css';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import { ListItemIcon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
  }));

  const App = () => {

    const classes = useStyles();
    const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <List>
        <Link to="/users" className={classes.link}>
          <ListItem button key="userList">
            <ListItemText primary="User List"/>
          </ListItem>
        </Link>
        <Link to="/orders" className={classes.link}>
          <ListItem button key="userList">
            <ListItemText primary="Orders"/>
          </ListItem>
        </Link>
        <Link to="/orders/create" className={classes.link}>
          <ListItem button key="orderForm">
            <ListItemText primary="Create Order"/>
          </ListItem>
        </Link>
        <Link to="/products" className={classes.link}>
          <ListItem button key="productList">
            <ListItemText primary="Product List"/>
          </ListItem>
        </Link>
        <Link to="/products/create" className={classes.link}>
          <ListItem button key="productForm">
            <ListItemText primary="Add Product"/>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <Router>
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
                <ListItemIcon>
                    <MenuIcon />
                </ListItemIcon>
                Menu
            </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
        <Switch>
            <Route path='/users' exact component={UserList} />
            <Route path='/users/create' exact component={UserRegistration} />
            <Route path='/users/login' exact component={UserLogin} />
            <Route path='/orders' exact component={OrderList} />
            <Route path='/orders/create' exact component={OrderForm} />
            <Route path='/products' exact component={ProductList} />
            <Route path='/products/create' exact component={ProductForm} />
        </Switch>
    </Router>
  );
}

export default App;