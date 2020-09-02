import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Address from "../Components/CheckOut/Address";
import Payment from "../Components/CheckOut/Payment";
import Summary from "../Components/CheckOut/Summary";
import Footer from "../Components/Footer/Footer";
import NavigationHeader from "../Components/Headers/NavigationHeader";


const useStyles = makeStyles((theme) => ({
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

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const Checkout = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    //Address details
    const [getFirstNameValue, setFirstNameValue] = useState({firstName : ''})
    const [getLastNameValue, setLastNameValue] = useState({lastName : ''})
    const [getAdd1Value, setAdd1Value] = useState({addressLine1 : ''})
    const [getAdd2Value, setAdd2Value] = useState({addressLine2 : ''})
    const [getCityValue, setCityValue] = useState({city : ''})

    //Payment details
    const [getCardNameValue, setCardNameValue] = useState({cardName : ''})
    const [getCardNoValue, setCardNoValue] = useState({cardNo : ''})
    const [getExpValue, setExpValue] = useState({expDate : ''})
    const [getCV, setCV] = useState({cvValue : ''})

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Address
                        firstNameHandler = {event => setFirstNameValue(event.target.value)}
                        lastNameHandler = {event => setLastNameValue(event.target.value)}
                        address1Handler = {event => setAdd1Value(event.target.value)}
                        address2Handler = {event => setAdd2Value(event.target.value)}
                        cityHandler = {event => setCityValue(event.target.value)}
                    />;
            case 1:
                return <Payment
                        cardNameHandler = {event => setCardNameValue(event.target.value)}
                        cardNoHandler = {event => setCardNoValue(event.target.value)}
                        expDateHandler = {event => setExpValue(event.target.value)}
                        cvNoHandler = {event => setCV(event.target.value)}
                    />;
            case 2:
                return <Summary />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);

        if((activeStep + 1) == 3){
            let formData = {
                firstName : getFirstNameValue,
                lastName : getLastNameValue,
                addressLine1 : getAdd1Value,
                addressLine2 : getAdd2Value,
                city : getCityValue,
                cardName : getCardNameValue,
                cardNo : getCardNoValue,
                expDate : getExpValue,
                cvNo : getCV
            }
            console.log(formData);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <NavigationHeader />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
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
                <Footer />
            </main>
        </React.Fragment>
    );
}

export default Checkout;
