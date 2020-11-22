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
import { ProductOverview, ProductTransactions, ProductEditHistory } from "../";

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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={modalOpen}>
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
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default ProductDetailsModal;
