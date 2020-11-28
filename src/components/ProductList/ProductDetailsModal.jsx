import React, { Fragment, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from "./ProductModalStyles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ProductOverview, ProductTransactions, ProductEditHistory } from "../";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDetailsModal = ({
  modalOpen,
  handleCloseModal,
  modalProduct,
  modalProductHistory,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const classes = useStyles();

  return (
    <Fragment>
      <Dialog
        fullScreen
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={modalOpen}
        TransitionComponent={Transition}
      >
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Product Details
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
          <Paper elevation={3}>
            <Grid container>
              <Grid item xs={12}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                  >
                    <Tab label="Overview" />
                    <Tab label="Transactions" />
                    <Tab label="History" />
                  </Tabs>
                </AppBar>
                {selectedTab === 0 && (
                  <ProductOverview modalProduct={modalProduct} />
                )}
                {selectedTab === 1 && (
                  <ProductTransactions modalProduct={modalProduct} />
                )}
                {selectedTab === 2 && (
                  <ProductEditHistory productHistories={modalProductHistory} />
                )}
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default ProductDetailsModal;
