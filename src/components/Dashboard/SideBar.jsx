import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { mainListItems } from "./listItems";
import useStyles from "./DashboardStyle";

const SideBar = ({ user, open, handleDrawerClose, logout }) => {
  const classes = useStyles();
  return (
    <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
      <div className={classes.toolbarIcon}>
        <Typography
          component="h2"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {user.name}
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
      <List>
        <div>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </div>
      </List>
    </Drawer>
  );
};

export default SideBar;
