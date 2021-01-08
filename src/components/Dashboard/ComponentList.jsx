import React, { useState } from "react";

import StorefrontIcon from "@material-ui/icons/Storefront";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import StorageIcon from "@material-ui/icons/Storage";
import BarChartIcon from "@material-ui/icons/BarChart";
import RoomIcon from "@material-ui/icons/Room";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { Link } from "react-router-dom";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import useStyles from "./DashboardStyle";
import ListAltIcon from "@material-ui/icons/ListAlt";
import EditIcon from "@material-ui/icons/Edit";

import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";
import { ComponentChildrenExpander } from "..";

const components = [
  {
    url: "/analytics",
    name: "Analytics",
    icon: <BarChartIcon />,
    collapsible: false,
    open: false,
  },
  {
    url: "/orders",
    name: "Orders",
    icon: <StorefrontIcon />,
    collapsible: false,
    open: false,
  },
  {
    url: "/orders/create",
    name: "Create Order",
    icon: <AddShoppingCartIcon />,
    collapsible: false,
    open: false,
  },
  {
    url: "/products",
    name: "Product List",
    icon: <LocalMallIcon />,
    collapsible: false,
    open: false,
  },
  {
    url: "/products/create",
    name: "Add Product",
    icon: <PlaylistAddIcon />,
    collapsible: false,
    open: false,
  },
  {
    name: "Manage Inventory",
    icon: <StorageIcon />,
    collapsible: true,
    open: false,
    children: [
      {
        name: "Inventory List",
        icon: <ListAltIcon />,
        url: "/inventory",
      },
      {
        name: "Inventory Adjustment",
        icon: <EditIcon />,
        url: "/inventory/adjust",
      },
    ],
  },
  {
    url: "/delivery/destinations",
    name: "Delivery Destinations",
    icon: <LocalShippingIcon />,
    collapsible: false,
    open: false,
  },
  {
    url: "/delivery/destinations/create",
    name: "Add Delivery Destinations",
    icon: <RoomIcon />,
    collapsible: false,
    open: false,
  },
];

export const ComponentList = () => {
  const [openedComponentIndex, setOpenedComponentIndex] = useState(null);

  const handleClick = (index) => {
    if (index === openedComponentIndex) {
      setOpenedComponentIndex(-1);
    } else {
      setOpenedComponentIndex(index);
    }
  };

  return (
    <div>
      <List>
        {components.map((component) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={component.url}
          >
            <ListItem
              button
              key={components.indexOf(component)}
              onClick={() => handleClick(components.indexOf(component))}
            >
              <ListItemIcon>{component.icon}</ListItemIcon>
              <ListItemText primary={component.name} />
              {component.collapsible &&
                openedComponentIndex !== components.indexOf(component) && (
                  <ExpandMore />
                )}
              {component.collapsible &&
                openedComponentIndex === components.indexOf(component) && (
                  <ExpandLess />
                )}
            </ListItem>
            {component.collapsible && (
              <ComponentChildrenExpander
                openedComponentIndex={openedComponentIndex}
                componentIndex={components.indexOf(component)}
                children={component.children}
              />
            )}
          </Link>
        ))}
      </List>
    </div>
  );
};
export default ComponentList;
