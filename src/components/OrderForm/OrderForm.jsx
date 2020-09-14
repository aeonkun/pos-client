import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CustomerDetails from './CustomerDetails';
import OrderDetails from './OrderDetails';
import Review from './Review';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          RBV
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

const OrderForm = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [order, setOrder] = useState({
        firstName: '',
        lastName: '',
        address: '',
        contactNumber: '',
        orderDetails: [],
        paymentStatus: ''
    });
  
    const handleNext = () => {
      setActiveStep(activeStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };

    const handleStateChange = input => e => {
        setOrder({...order, [input]: e.target.value});
        console.log(order);
    }

    const handleProductStateChange = ({ id, name, quantity, unitPrice, totalPrice }) => {

        //get index of given object if object is already present in the array. Index will be -1 if it is not present
        const index = order.orderDetails.findIndex(a => a.id === id);

        if (index !== -1) {
            order.orderDetails[index] = {
                id, name, quantity, unitPrice, totalPrice
            }
        } else {
            setOrder({...order, orderDetails:[...order.orderDetails, { id, name, quantity, unitPrice, totalPrice }]})
        }

        console.log(order);
    }

    const steps = ['Customer details', 'Order details', 'Review order'];
  
    function getStepContent(step) {
        switch (step) {
        case 0:
            return <CustomerDetails handleStateChange={handleStateChange} order={order}/>;
        case 1:
            return <OrderDetails handleProductStateChange={handleProductStateChange} order={order}/>;
        case 2:
            return <Review order={order}/>;
        default:
            throw new Error('Unknown step');
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
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order confirmation, and will
                    send you an update when your order has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
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
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </main>
      </Fragment>
    )
}

export default OrderForm;