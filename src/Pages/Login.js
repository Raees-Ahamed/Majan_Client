import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Footer from "../Components/Footer/Footer";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import * as AppGlobal from "../AppHelp/AppGlobal";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
        height: '100vh',
    }
}));

const Login = () => {
    const classes = useStyles();
    let history = useHistory();

    const [getUserName, setUserName] = useState({ userName: '' });
    const [getPwd, setPwd] = useState({ password: '' });
    const [getUserStatus,setUserStatus] = useState({ status: null });

    const loginHandler = async () => {
        const userObj = {
            email: getUserName,
            password: getPwd
        }

        let result = await axios.get(AppGlobal.apiBaseUrl + `User/${userObj.email}/${userObj.password}`);

        if(result.data.respondId == 0){
            setErrorMsg({msg:result.data.description})
            setUserStatus({status:0})
        }else{
            setErrorMsg({msg:result.data.description})
            setUserStatus({status:1})
        }
    }

    const [getErrorMsg, setErrorMsg] = useState({msg:''});

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={event => setUserName(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={event => setPwd(event.target.value)}
                        />

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
                            onClick={() => loginHandler()}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="javascript:void(0)" variant="body2" onClick={() => history.push("/register")}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Footer />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default Login;
