import React from "react";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import useStyles from "./DashboardStyle";
import { Link } from "react-router-dom";

const ComponentChildrenExpander = ({
  openedComponentIndex,
  componentIndex,
  children,
}) => {
  const classes = useStyles();
  return (
    <Collapse
      in={openedComponentIndex === componentIndex}
      timeout="auto"
      unmountOnExit
    >
      {children.map((child) => (
        <List component="div" disablePadding>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={child.url}
          >
            <ListItem button className={classes.nested}>
              <ListItemText primary={child.name} />
            </ListItem>
          </Link>
        </List>
      ))}
    </Collapse>
  );
};

export default ComponentChildrenExpander;
