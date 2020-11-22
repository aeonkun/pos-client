import React, { Fragment } from "react";
import { Select, MenuItem, Typography, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const PageSelector = ({
  pages,
  handleChangePage,
  page,
  handleChangeRow,
  rows,
}) => {
  return (
    <Fragment>
      <Grid container justify="flex-end" alignItems="center">
        <Pagination count={pages} page={page} onChange={handleChangePage} />
        <Typography variant="body1">Rows per page: </Typography>
        <Select
          labelId="row"
          id="row"
          value={Number(rows)}
          onChange={handleChangeRow}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </Grid>
    </Fragment>
  );
};

export default PageSelector;
