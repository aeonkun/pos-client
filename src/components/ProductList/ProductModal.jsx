import React, { Fragment } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useStyles from "./ProductModalStyles";
import { Button, Divider } from "@material-ui/core";

const ProductModal = ({ openModal, handleCloseModal, modalProduct }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={openModal}>
          <Paper elevation={3}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {modalProduct.item_name}
                </Typography>
                <Typography variant="body" gutterBottom>
                  {`Stocks: ${modalProduct.quantity} | Price: ${modalProduct.price}`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
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
                      defaultValue={modalProduct.item_name}
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.buttonWrapper}>
                    <TextField
                      id="quantity"
                      label="Quantity"
                      fullWidth
                      defaultValue={modalProduct.quantity}
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.buttonWrapper}>
                    <TextField
                      id="price"
                      label="Price"
                      fullWidth
                      defaultValue={modalProduct.price}
                    />
                  </Grid>
                  <Grid item xs={4} className={classes.buttonWrapper}>
                    <Button variant="contained" color="primary">
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

export default ProductModal;
