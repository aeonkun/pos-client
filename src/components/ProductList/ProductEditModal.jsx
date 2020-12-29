import React, { Fragment } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useStyles from "./ProductModalStyles";
import { Button } from "@material-ui/core";

const ProductEditModal = ({
  editProductModalOpen,
  handleCloseEditProductModal,
  modalProduct,
  modalProductHistory,
  handleModalProductUpdate,
  updateProduct,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={editProductModalOpen}
        onClose={handleCloseEditProductModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={editProductModalOpen}>
          <Paper elevation={3}>
            <Grid container>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Edit Product Details:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.buttonWrapper}>
                    <TextField
                      id="name"
                      label="Name"
                      fullWidth
                      defaultValue={modalProduct.itemName}
                      onChange={handleModalProductUpdate("itemName")}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.buttonWrapper}>
                    <TextField
                      id="price"
                      label="Price"
                      type="number"
                      inputProps={{ min: "0", step: "1" }}
                      fullWidth
                      defaultValue={modalProduct.price}
                      onChange={handleModalProductUpdate("price")}
                    />
                  </Grid>
                  <Grid item xs={4} className={classes.buttonWrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => updateProduct()}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default ProductEditModal;
