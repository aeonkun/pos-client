import React, { Fragment } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { format } from "date-fns";
import * as Constants from "./constants/OrderListConstants";
import useStyles from "./OrderListStyles";
import { CircularProgress } from "@material-ui/core";

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return format(date, "MM/dd/yyyy hh:mm:ss aa");
}

const OrderStatusModal = ({
  openModal,
  handleCloseModal,
  status,
  updateStatusAndHistoryState,
  updateStatus,
  currentOrder,
  isLoading,
}) => {
  const classes = useStyles();

  if (currentOrder == null)
    return (
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={() => handleCloseModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <Grid container justify="center" alignItems="center">
              <CircularProgress />
            </Grid>
          </div>
        </Fade>
      </Modal>
    );

  return (
    <div>
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={() => handleCloseModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">Status</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2">Order Status:</Typography>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={status.orderStatus}
                  disabled={
                    status.presentOrderStatus ===
                      Constants.orderStatuses.COMPLETED ||
                    status.presentOrderStatus ===
                      Constants.orderStatuses.CANCELLED
                  }
                  fullWidth
                  onChange={updateStatusAndHistoryState("orderStatus")}
                >
                  <MenuItem value={currentOrder.orderStatus}>
                    {Constants.orderStatuses[currentOrder.orderStatus]}
                  </MenuItem>
                  {Constants.orderStatuses[currentOrder.orderStatus] ===
                    Constants.orderStatuses.NEW && (
                    <MenuItem value={"CONFIRMED"}>
                      {Constants.orderStatuses.CONFIRMED}
                    </MenuItem>
                  )}
                  {Constants.orderStatuses[currentOrder.orderStatus] ===
                    Constants.orderStatuses.CONFIRMED && (
                    <MenuItem value={"COMPLETED"}>
                      {Constants.orderStatuses.COMPLETED}
                    </MenuItem>
                  )}
                  <MenuItem value={"CANCELLED"}>
                    {Constants.orderStatuses.CANCELLED}
                  </MenuItem>
                </Select>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="center"
                xs={12}
                sm={4}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={
                    isLoading ||
                    status.presentOrderStatus ===
                      Constants.orderStatuses.COMPLETED ||
                    status.presentOrderStatus ===
                      Constants.orderStatuses.CANCELLED
                  }
                  onClick={() => updateStatus(status.orderId)}
                >
                  Save
                </Button>
              </Grid>
              <Grid Grid item xs={12}>
                <Divider variant="fullWidth" className={classes.divider} />
                <Typography variant="h6">Status History</Typography>
                <List dense={true} className={classes.statusHistory}>
                  {status.statusAndHistories.length !== 0 ? (
                    status.statusAndHistories.map((history) => (
                      <ListItem>
                        <ListItemText
                          primary={`${history.modifiedBy} updated the status from ${history.oldStatus} to ${history.newStatus}.`}
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
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default OrderStatusModal;
