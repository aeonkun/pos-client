import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { Grid, Typography } from "@material-ui/core";
import { ProductModal } from "..";

const ProductList = ({
  data,
  handleOpenModal,
  handleCloseModal,
  modalOpen,
  modalProduct,
}) => {
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">Products</Typography>
        </Grid>
        <Grid item xs={12}>
          {data.length === 0 ? (
            <p>No products to show</p>
          ) : (
            <List component="product-list" aria-label="main mailbox folders">
              {data.map((element) => (
                <Fragment>
                  <ListItem button>
                    <ListItemText
                      primary={`${element.item_name}`}
                      secondary={`Stock: ${element.quantity} | Price: ${
                        element.price / 100
                      } `}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleOpenModal(element)}
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </Fragment>
              ))}
            </List>
          )}
        </Grid>
        <ProductModal
          modalOpen={modalOpen}
          handleCloseModal={handleCloseModal}
          modalProduct={modalProduct}
        />
      </Grid>
    </Fragment>
  );
};

export default ProductList;
