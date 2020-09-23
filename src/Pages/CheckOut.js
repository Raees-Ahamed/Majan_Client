import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Summary from "../Components/CheckOut/Summary";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { useCookies } from 'react-cookie';
import axios from "axios";
import * as AppGlobal from "../AppHelp/AppGlobal";

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

const steps = ['Shipping address', 'Payment details', 'Review your order'];


const Checkout = () => {

    const classes = useStyles();
    const [cookies, setCookie, removeCookie] = useCookies(['cartItems']);
    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwtToken']);

    const [getFirstNameValue, setFirstNameValue] = useState('');
    const [getLastNameValue, setLastNameValue] = useState('');
    const [getAddressValue, setAddressValue] = useState('');
    const [getCityValue, setCityValue] = useState('');
    const [getContactValue, setContactValue] = useState('');
    const [getNameCardValue, setNameValue] = useState('');
    const [getCardNoValue, setCardNoValue] = useState('');
    const [getExpiryDate, setExpiryDate] = useState('');
    const [getCVNo, setCVNo] = useState('');

    const [getFirstNameError, setFirstNameError] = useState(false);
    const [getLastNameError, setLastNameError] = useState(false);
    const [getAddressError, setAddressError] = useState(false);
    const [getCityError, setCityError] = useState(false);
    const [getContactError, setContactError] = useState(false);
    const [getNameCardError, setNameError] = useState(false);
    const [getCardNoError, setCardNoError] = useState(false);
    const [getExpiryDateError, setExpiryDateError] = useState(false);
    const [getCVNoError, setCVNoError] = useState(false);
    const [getTokenError, setTokenError] = useState(false);
    const [getErrorMsg, setErrorMsg] = useState({msg: ''});

    const handleSubmit = async () => {

        setFirstNameError(false);
        setLastNameError(false);
        setAddressError(false);
        setCityError(false);
        setContactError(false);
        setNameError(false);
        setCardNoError(false);
        setExpiryDateError(false);
        setCVNoError(false);
        setErrorMsg({msg: ''});
        setTokenError(false);


        let formData = {
            firstName : getFirstNameValue,
            lastName : getLastNameValue,
            address : getAddressValue,
            city : getCityValue,
            contactNo : getContactValue,
            cardName: getNameCardValue,
            cardNo: getCardNoValue,
            expiryDate: getExpiryDate,
            cvNo: getCVNo,
            cartItems: cookies.cartItems
        }

        console.log(formData);

        const options = {
            headers: {'x-jwt-token': cookiesJWT.jwtToken}
        };

        try{
            let result = await axios.post(AppGlobal.apiBaseUrl + 'Order',formData,options);
            removeCookie('cartItems');
            console.log(result.data.Description);

        }catch (e){
            console.log(e.response.data);

            if(!e.response.data.firstName){
                setErrorMsg({msg: e.response.data.Description});
                setFirstNameError(true);
            }

            if(!e.response.data.lastName){
                setErrorMsg({msg: e.response.data.Description});
                setLastNameError(true);
            }

            if(!e.response.data.address){
                setErrorMsg({msg: e.response.data.Description});
                setAddressError(true);
            }

            if(!e.response.data.city){
                setErrorMsg({msg: e.response.data.Description});
                setCityError(true);
            }

            if(!e.response.data.contactNo){
                setErrorMsg({msg: e.response.data.Description});
                setContactError(true);
            }

            if(!e.response.data.cardName){
                setErrorMsg({msg: e.response.data.Description});
                setNameError(true);
            }

            if(!e.response.data.cardNo){
                setErrorMsg({msg: e.response.data.Description});
                setCardNoError(true);
            }

            if(!e.response.data.expiryDate){
                setErrorMsg({msg: e.response.data.Description});
                setExpiryDateError(true);
            }

            if(!e.response.data.cvNo){
                setErrorMsg({msg: e.response.data.Description});
                setCVNoError(true);
            }

            if(!e.response.data.token){
                setErrorMsg({msg: e.response.data.Description});
                setTokenError(true);
            }
        }

    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <React.Fragment>

                        {/*Shipping details*/}
                        <Typography variant="h6" gutterBottom>
                            Shipping address
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error = {getFirstNameError}
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    autoComplete="given-name"
                                    onChange={event => setFirstNameValue(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error = {getLastNameError}
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                    autoComplete="family-name"
                                    onChange={event => setLastNameValue(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error = {getAddressError}
                                    required
                                    id="address1"
                                    name="address1"
                                    label="Address line 1"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    onChange={event => setAddressValue(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error = {getCityError}
                                    required
                                    id="city"
                                    name="city"
                                    label="City"
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                    onChange={event => setCityValue(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error = {getContactError}
                                    id="phone"
                                    name="phone"
                                    label="Contact No"
                                    fullWidth
                                    onChange={event => setContactValue(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        {/*End shipping details*/}

                        <br/><br/>

                        {/*Payment details*/}
                        <Typography variant="h6" gutterBottom>
                            Payment method
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    error = {getNameCardError}
                                    required id="cardName"
                                    label="Name on card"
                                    fullWidth
                                    autoComplete="cc-name"
                                    onChange={event => setNameValue(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    error = {getCardNoError}
                                    required
                                    id="cardNumber"
                                    label="Card number"
                                    fullWidth
                                    autoComplete="cc-number"
                                    onChange={event => setCardNoValue(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    error = {getExpiryDateError}
                                    required
                                    id="expDate"
                                    label="Expiry date"
                                    fullWidth
                                    autoComplete="cc-exp"
                                    onChange={event => setExpiryDate(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    error = {getCVNoError}
                                    required
                                    id="cvv"
                                    label="CVV"
                                    helperText="Last three digits on signature strip"
                                    fullWidth
                                    autoComplete="cc-csc"
                                    onChange={event => setCVNo(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        {/*End payment details*/}

                        <br/><br/>

                        <Summary />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            className={classes.button}
                        >
                            Submit
                        </Button>

                        {
                            (getErrorMsg.msg == '') ? null : (
                                <div>
                                    <br/>
                                    <Alert severity="error">{getErrorMsg.msg}</Alert>
                                </div>
                            )
                        }
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default Checkout;
