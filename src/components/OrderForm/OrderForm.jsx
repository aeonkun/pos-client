import React, { Fragment, useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CustomerDetails from "./CustomerDetails";
import OrderDetails from "./OrderDetails";
import Review from "./Review";
import { Grid, CircularProgress } from "@material-ui/core";
import { submitOrderApi } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";
import useStyles from "./OrderFormStyles";
import * as Constants from "./constants/OrderFormConstants";
import { getDeliveryDestinationsAndChargesApi } from "../../api";

const OrderForm = () => {
  const classes = useStyles();

  const { user, getAccessTokenSilently } = useAuth0();
  const [activeStep, setActiveStep] = useState(0);
  const [order, setOrder] = useState({
    firstName: "",
    lastName: "",
    deliveryAddress: "",
    contactNumber: "",
    nearbyLandmark: "",
    orderDetails: [],
    isPaid: false,
    status: "New Order",
    createdBy: user.name,
    totalPrice: 0,
    paymentMethod: Object.keys(Constants.paymentMethod).find(
      (key) => Constants.paymentMethod[key] === "Cash on delivery"
    ),
    additionalNotes: "",
    municipality: "",
    deliveryCharge: 0,
  });
  const [dateCreated, setDateCreated] = useState(new Date());
  const [orderNumber, setOrderNumber] = useState(null);
  const [destinationsAndCharges, setDestinationsAndCharges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDeliveryDestinationsAndCharges = async () => {
      const token = await getAccessTokenSilently();
      const response = await getDeliveryDestinationsAndChargesApi(token);
      if (response.length === 0) {
        setDefaultDestinationAndCharge();
      } else {
        setDestinationsAndCharges(response);
      }
    };
    getDeliveryDestinationsAndCharges();
    setLoading(false);
  }, []);

  const setDefaultDestinationAndCharge = () => {
    setDestinationsAndCharges([{ destination: "None", deliveryCharge: 0 }]);
  };

  const handleNext = async () => {
    setActiveStep(activeStep + 1);

    if (activeStep === steps.length - 1) {
      const token = await getAccessTokenSilently();
      order.dateTimeCreated = dateCreated;
      const orderId = await submitOrderApi(token, order);
      setOrderNumber(orderId);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStateChange = (input) => (e) => {
    if (input === "municipality") {
      setOrder({
        ...order,
        deliveryCharge: (
          destinationsAndCharges.find(
            (item) => item.destination === e.target.value
          ).deliveryCharge / 100
        ).toFixed(2),
        municipality: e.target.value,
      });
    } else {
      setOrder({ ...order, [input]: e.target.value });
    }
  };

  const handleChangeDateCreatedState = (date) => {
    setDateCreated(date);
  };

  const NOT_PRESENT = -1;
  const handleProductStateChange = ({
    productId,
    name,
    quantity,
    price,
    totalPrice,
  }) => {
    //get index of given object if object is already present in the array. Index will be -1 if it is not present
    const index = order.orderDetails.findIndex(
      (element) => element.productId === productId
    );
    //if product index is already present in the order details array, edit the properties,
    //else, add product to order details array
    if (index !== NOT_PRESENT) {
      //if quantity is set to blank or 0, remove it from the orderDetails array
      //else update the orderDetail
      if (!quantity || quantity === "0") {
        let details = [...order.orderDetails];
        details.splice(index, 1);
        setOrder({ order, orderDetails: details });
      } else {
        setOrder(
          order,
          (order.orderDetails[index] = {
            productId,
            name,
            quantity,
            price,
            totalPrice,
          })
        );
      }
    } else {
      if (quantity && quantity !== "0") {
        setOrder({
          ...order,
          orderDetails: [
            ...order.orderDetails,
            { productId, name, quantity, price, totalPrice },
          ],
        });
      }
    }
  };

  const steps = ["Customer details", "Order details", "Review order"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <CustomerDetails
            handleStateChange={handleStateChange}
            order={order}
            destinationsAndCharges={destinationsAndCharges}
            dateCreated={dateCreated}
            handleChangeDateCreatedState={handleChangeDateCreatedState}
          />
        );
      case 1:
        return (
          <OrderDetails
            handleStateChange={handleStateChange}
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

  if (loading)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h3" align="center">
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
                {orderNumber !== null ? (
                  <Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      {`Your order has been successfully placed! Order Number: ${orderNumber}`}
                    </Typography>
                  </Fragment>
                ) : (
                  <Grid container justify="center" alignItems="center">
                    <CircularProgress />
                  </Grid>
                )}
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
                    disabled={
                      order.orderDetails.length === 0 && activeStep !== 0
                    }
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
