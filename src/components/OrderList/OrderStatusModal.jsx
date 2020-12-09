import React from "react";
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

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return format(date, "MM/dd/yyyy hh:mm:ss aa");
}

const OrderStatusModal = ({
  currentOrder,
  openModal,
  handleCloseModal,
  status,
  updateStatusAndHistoryState,
  updateStatus,
}) => {
  const classes = useStyles();
  console.log("inmodal");
  console.log(currentOrder);

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
                  fullWidth
                  onChange={updateStatusAndHistoryState("orderStatus")}
                >
                  {Object.values(Constants.orderStatuses).map((status) => (
                    <MenuItem
                      value={Object.keys(Constants.orderStatuses).find(
                        (key) => Constants.orderStatuses[key] === status
                      )}
                    >
                      {status}
                    </MenuItem>
                  ))}
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
                          primary={`${history.modifiedBy} updated the ${history.statusType} from ${history.oldStatus} to ${history.newStatus}.`}
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
