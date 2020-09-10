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
import { useCookies } from 'react-cookie';

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

    const [cookies, setCookie, removeCookie] = useCookies(['jwtToken']);

    const [getFirstNameValue, setFirstNameValue] = useState('')
    const [getLastNameValue, setLastNameValue] = useState('')
    const [getEmailValue, setEmailValue] = useState('')
    const [getPwdValue, setPwdValue] = useState('')
    const [getConfPwdValue, setConfPwdValue] = useState('')
    const [getErrorMsg, setErrorMsg] = useState({msg: ''});
    const [getMobileNumberValue, setMobileNumberValue] = useState('0');
    const [phoneFieldStatus, setphoneFieldStatus] = useState(false);
    const [getButtonStatus, setButtonStatus] = useState({status: 'disabled'});

    const [getFirstNameMsg, setFirstNamemsg] = useState(false)
    const [getLastNameMsg, setLastNameMsg] = useState(false)
    const [getEmailMag, setEmailMsg] = useState(false)
    const [getPwdMsg, setPwdMsg] = useState(false)
    const [getConfPwdMsg, setConfPwdMsg] = useState(false)
    const [getMobileNumberMsg, setMobileNumberMsg] = useState(false);

    const classes = useStyles();
    let history = useHistory();

    const submitRegisterHandler = async () =>{
        setErrorMsg({msg: ''});

        setFirstNamemsg(false);
        setLastNameMsg(false);
        setEmailMsg(false);
        setPwdMsg(false);
        setConfPwdMsg(false);
        setMobileNumberMsg(false);

        let formData = {
            firstName : getFirstNameValue,
            lastName : getLastNameValue,
            email : getEmailValue,
            password : getPwdValue,
            confirmPassword : getConfPwdValue,
            mobileNum: getMobileNumberValue,
            usertype: 1
        }

        console.log(formData);

        try{
            let result = await axios.post(AppGlobal.apiBaseUrl + 'User',formData);
            console.log(result);
            alert(result.data.Description);
            if(cookies.jwtToken){
                removeCookie('jwtToken');
            }
            setCookie('jwtToken', JSON.stringify(result.data.token));

        }catch (e){
            console.log(e.response.data);

            if(!e.response.data.fName){
                setErrorMsg({msg: e.response.data.Description});
                setFirstNamemsg(true);
            }

            if(!e.response.data.lName){
                setErrorMsg({msg: e.response.data.Description});
                setLastNameMsg(true);
            }

            if(!e.response.data.email){
                setErrorMsg({msg: e.response.data.Description});
                setEmailMsg(true);
            }

            if(!e.response.data.pwd){
                setErrorMsg({msg: e.response.data.Description});
                setPwdMsg(true);
            }

            if(!e.response.data.confirmPwd){
                setErrorMsg({msg: e.response.data.Description});
                setConfPwdMsg(true);
            }

            if(!e.response.data.mobileNum){
                setErrorMsg({msg: e.response.data.Description});
                setMobileNumberMsg(true);
            }
        }
    }

    const setUpRecaptcha = (phoneNo) => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recptcha-container', {
            'size': 'invisible',
            'callback': function (response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit(phoneNo);
            }
        });
    }

    const onSignInSubmit = (phoneNo) => {

        setUpRecaptcha(phoneNo);

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
                    alert('Verification success.')
                    setButtonStatus({status: ''})
                }).catch(function (error) {
                    alert(error.code);
                    window.location.reload();
                    // User couldn't sign in (bad verification code?)
                    // ...
                });
            }).catch(function (error) {
                console.log(error);
                if(typeof error.code !== 'undefined'){
                    alert(error.code);
                    window.location.reload();
                }
            // Error; SMS not sent
            // ...
        });
    }

    const verifyPhoneNo = () => {
        if(getMobileNumberValue.mobileNumber == 0){
            setphoneFieldStatus(true);
        }else{
            setphoneFieldStatus(false);
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
                                error = {getFirstNameMsg}
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
                                error = {getLastNameMsg}
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
                                error = {getEmailMag}
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
                                error = {getPwdMsg}
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
                                error = {getConfPwdMsg}
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
                                error = {phoneFieldStatus}
                                variant="outlined"
                                required
                                fullWidth
                                name="mobileNumber"
                                label="mobileNumber"
                                type="number"
                                id="mobileNumber"
                                onChange={event => setMobileNumberValue(event.target.value)}
                                InputProps={{endAdornment: <Button variant="contained" size="medium" color="primary" className={classes.margin} onClick={verifyPhoneNo}>Verify</Button>}}
                            />
                        </Grid>
                    </Grid>
                    {
                        (getErrorMsg.msg == '') ?
                            '' :
                            <div>
                                <br/>
                                <Alert severity="error">{getErrorMsg.msg}</Alert>
                            </div>
                    }

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>submitRegisterHandler()}
                        disabled={getButtonStatus.status}
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