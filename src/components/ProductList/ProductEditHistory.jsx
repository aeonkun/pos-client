import React, { Fragment } from "react";
import { List, ListItemText, ListItem } from "@material-ui/core";
import { format } from "date-fns";
import useStyles from "./ProductModalStyles";

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return format(date, "MM/dd/yyyy hh:mm:ss aa");
}

const ProductEditHistory = ({ productHistories }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <List dense={true} className={classes.statusHistory}>
        {productHistories.length !== 0 ? (
          productHistories.map((history) => (
            <ListItem>
              <ListItemText
                primary={`${history.modifiedBy} updated the ${history.changeType} from ${history.oldValue} to ${history.newValue}.`}
                secondary={`Changed on ${formatDateTime(
                  history.dateTimeModified
                )}`}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No changes made" />
          </ListItem>
        )}
      </List>
    </Fragment>
  );
};

export default ProductEditHistory;
