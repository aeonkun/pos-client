import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InfoIcon from "@material-ui/icons/Info";
import EditIcon from "@material-ui/icons/Edit";
import {
  Grid,
  Typography,
  IconButton,
  Divider,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { ProductDetailsModal } from "..";
import ProductEditModal from "./ProductEditModal";

const ProductList = ({
  data,
  handleOpenModal,
  handleCloseModal,
  modalOpen,
  modalProduct,
  modalProductHistory,
  handleModalProductUpdate,
  updateProduct,
  editProductModalOpen,
  handleOpenProductEditModal,
  handleCloseEditProductModal,
}) => {
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Products</Typography>
        </Grid>
        <Grid item xs={12}>
          {data.length === 0 ? (
            <p>No products to show</p>
          ) : (
            <List component="product-list" aria-label="main mailbox folders">
              {data.map((product) => (
                <Fragment>
                  <ListItem button ContainerComponent="div">
                    <ListItemText
                      primary={`${product.itemName}`}
                      secondary={`Price: ₱${(product.price / 100).toFixed(
                        2
                      )} | Stock on Hand: ${
                        product.stockOnHand
                      } | Committed Stock: ${
                        product.committedStock
                      } | Available Stock: ${product.availableStock}`}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenProductEditModal(product)}
                    >
                      <EditIcon />
                    </IconButton>
                    <ListItemSecondaryAction>
                      <InfoIcon
                        edge="end"
                        aria-label="edit"
                        color="primary"
                        onClick={() => handleOpenModal(product)}
                      >
                        <EditIcon />
                      </InfoIcon>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </Fragment>
              ))}
            </List>
          )}
        </Grid>
        <ProductEditModal
          editProductModalOpen={editProductModalOpen}
          handleCloseEditProductModal={handleCloseEditProductModal}
          modalProduct={modalProduct}
          handleModalProductUpdate={handleModalProductUpdate}
          updateProduct={updateProduct}
        />
        <Grid>
          <ProductDetailsModal
            modalOpen={modalOpen}
            handleCloseModal={handleCloseModal}
            modalProduct={modalProduct}
            modalProductHistory={modalProductHistory}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProductList;
