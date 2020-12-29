import React, { Fragment } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Divider,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import EditIcon from "@material-ui/icons/Edit";

const DestinationList = ({ data }) => {
  return (
    <List component="delivery-destinations">
      {data.map((delivery) => (
        <Fragment>
          <ListItem button ContainerComponent="div">
            <ListItemText
              primary={`${delivery.destination}`}
              secondary={`Delivery Charge: ₱${(
                delivery.deliveryCharge / 100
              ).toFixed(2)}`}
            />
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
            <ListItemSecondaryAction>
              <InfoIcon edge="end" aria-label="edit" color="primary">
                <EditIcon />
              </InfoIcon>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

export default DestinationList;
