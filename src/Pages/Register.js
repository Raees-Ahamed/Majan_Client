import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import * as AppGlobal from "../AppHelp/AppGlobal";
import Alert from '@material-ui/lab/Alert';
import firebase from '../Firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = () => {

    const [getFirstNameValue, setFirstNameValue] = useState({firstName : ''})
    const [getLastNameValue, setLastNameValue] = useState({lastName : ''})
    const [getEmailValue, setEmailValue] = useState({email : ''})
    const [getPwdValue, setPwdValue] = useState({password : ''})
    const [getConfPwdValue, setConfPwdValue] = useState({confPassword : ''})
    const [getUserStatus,setUserStatus] = useState({ status: null });
    const [getErrorMsg, setErrorMsg] = useState({msg:''});
    const [getMobileNumberValue, setMobileNumberValue] = useState({ mobileNumber: 0 });
    const [phoneFieldStatus, setphoneFieldStatus] = useState({ isError: false });

    const [getButtonStatus, setButtonStatus] = useState(false);

    const classes = useStyles();
    let history = useHistory();

    const submitRegisterHandler = () =>{
        let formData = {
            firstName : getFirstNameValue,
            lastName : getLastNameValue,
            email : getEmailValue,
            password : getPwdValue,
            confPassword : getConfPwdValue,
            mobile: getMobileNumberValue,
            usertype: 1
        }
        console.log(formData);
        onSignInSubmit();
        // axios.post(AppGlobal.apiBaseUrl+'User/',  formData )
        //     .then(res => {
        //         if(res.data.respondId == 0){
        //             setErrorMsg({msg:res.data.description})
        //             setUserStatus({status:0})
        //         }else{
        //             setErrorMsg({msg:res.data.description})
        //             setUserStatus({status:1})
        //         }
        //     })
    }

    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recptcha-container', {
            'size': 'invisible',
            'callback': function (response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
        });
    }

    const onSignInSubmit = (phoneNo) => {

        setUpRecaptcha();

        var phoneNumber = phoneNo;
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;

                var code = window.prompt("Enter OTP");
                confirmationResult.confirm(code).then(function (result) {
                    var user = result.user;
                    console.log("User signIn " + JSON.stringify(user));
                }).catch(function (error) {
                    // User couldn't sign in (bad verification code?)
                    // ...
                });
            }).catch(function (error) {
            // Error; SMS not sent
            // ...
        });
    }

    const verifyPhoneNo = () => {
        if(getMobileNumberValue.mobileNumber == 0){
            setphoneFieldStatus({isError: true});
        }else{
            setphoneFieldStatus({isError: false});
            let phone  = getMobileNumberValue.replace(/^0+/, '');
            axios.get('https://api.ipify.org/').then(function (response) {
                let myIpAddress = response.data;
                axios.get(`http://api.ipstack.com/${myIpAddress}?access_key=f6c8a6a448c64f19008330fd0afea4f0`).then(function (response) {
                    let callingCode = '+'+response.data.location.calling_code;
                    let stdPhoneNo = callingCode+''+phone;
                    onSignInSubmit(stdPhoneNo);
                })
            })
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={event => setFirstNameValue(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={event => setLastNameValue((event.target.value))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={event => setEmailValue(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={event => setPwdValue(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confPassword"
                                label="confPassword"
                                type="password"
                                id="confPassword"
                                autoComplete="current-password"
                                onChange={event => setConfPwdValue(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error = {phoneFieldStatus.isError}
                                variant="outlined"
                                required
                                fullWidth
                                name="mobileNumber"
                                label="mobileNumber"
                                type="text"
                                id="mobileNumber"
                                onChange={event => setMobileNumberValue(event.target.value)}
                                InputProps={{endAdornment: <Button variant="contained" size="medium" color="primary" className={classes.margin} onClick={verifyPhoneNo}>Verify</Button>}}
                            />
                        </Grid>
                    </Grid>
                    {
                        (getUserStatus.status == null) ? '' : (
                            (getUserStatus.status == 1) ?
                                <div>
                                    <Alert severity="success">{getErrorMsg.msg}</Alert>
                                </div> : <div>
                                    <Alert severity="error">{getErrorMsg.msg}</Alert>
                                </div>
                        )
                    }

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>submitRegisterHandler()}
                        disabled = 'false'
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="javascript:void(0)" variant="body2" onClick={() => history.push("/login")}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                    <div id="recptcha-container"></div>
                </form>
            </div>
        </Container>
    );
}
export default Register;