import React, { Fragment, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CustomerDetails from "./CustomerDetails";
import OrderDetails from "./OrderDetails";
import Review from "./Review";
import { submitOrderApi } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";
import useStyles from "./OrderFormStyles";

const OrderForm = () => {
  const classes = useStyles();

  const { user, getAccessTokenSilently } = useAuth0();

  const [activeStep, setActiveStep] = React.useState(0);
  const [order, setOrder] = useState({
    firstName: "",
    lastName: "",
    address: "",
    contactNumber: "",
    orderDetails: [],
    isPaid: false,
    status: "Order Placed",
    createdBy: user.name,
    totalPrice: 0,
  });

  const handleNext = async () => {
    setActiveStep(activeStep + 1);

    if (activeStep === steps.length - 1) {
      const token = await getAccessTokenSilently();
      await submitOrderApi(token, order);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStateChange = (input) => (e) => {
    setOrder({ ...order, [input]: e.target.value });
    console.log(order);
  };

  const handleProductStateChange = ({
    productId,
    name,
    quantity,
    unitPrice,
    totalPrice,
  }) => {
    //get index of given object if object is already present in the array. Index will be -1 if it is not present
    const index = order.orderDetails.findIndex(
      (a) => a.productId === productId
    );
    //if product is already present in the order details array, edit the properties,
    //else, add product to order details array
    if (index !== -1) {
      //if quantity is set to blank or 0, remove it from the orderDetails array
      //else update the orderDetail
      console.log("product in array");
      if (!quantity || quantity === "0") {
        console.log("quantity set to 0 or blank");
        order.orderDetails.splice(index, 1);
      } else {
        console.log(`quant not zero or null : ${quantity}`);
        order.orderDetails[index] = {
          productId,
          name,
          quantity,
          unitPrice,
          totalPrice,
        };
      }
    } else {
      if (quantity && quantity !== "0") {
        setOrder({
          ...order,
          orderDetails: [
            ...order.orderDetails,
            { productId, name, quantity, unitPrice, totalPrice },
          ],
        });
      }
    }

    console.log(order);
  };

  const steps = ["Customer details", "Order details", "Review order"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <CustomerDetails
            handleStateChange={handleStateChange}
            order={order}
          />
        );
      case 1:
        return (
          <OrderDetails
            handleProductStateChange={handleProductStateChange}
            order={order}
          />
        );
      case 2:
        return <Review order={order} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Order Form
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create Order
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length ? (
              <Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </Fragment>
            ) : (
              <Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </Fragment>
            )}
          </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
};

export default OrderForm;
