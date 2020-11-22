import React, { useState, Fragment } from "react";
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
import useStyles from "./OrderListStyles";

const Invoice = ({ openInvoice, handleOpenInvoice, handleCloseInvoice }) => {
  const [details, setDetails] = useState(null);

  const classes = useStyles();

  return (
    <Fragment>
      <Modal
        className={classes.modal}
        open={openInvoice}
        onClose={() => handleCloseInvoice()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openInvoice}>
          <div className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">Status</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2">Order Status:</Typography>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="center"
                xs={12}
                sm={4}
              ></Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default Invoice;
