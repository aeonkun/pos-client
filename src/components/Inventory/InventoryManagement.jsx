import React, { Fragment, useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { AdjustInventory, AdjustmentList } from "../";

const InventoryManagement = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Fragment>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Inventory Adjustments" />
          <Tab label="Adjust Inventory" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <AdjustmentList />}
      {selectedTab === 1 && <AdjustInventory />}
    </Fragment>
  );
};

export default InventoryManagement;
