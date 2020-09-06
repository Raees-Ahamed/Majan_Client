import PropTypes from "prop-types";
import React, { Fragment } from "react";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:30,
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    height: '100vh'
  },

}));



const Contact = ({ location }) => {
  const { pathname } = location;
  const classes = useStyles();

  return (
    <Fragment>
      <Container component="main" className={classes.root}>
        <Grid container >
          <div className="pt-100 pb-100">
            <div className="">
              <div className="custom-row-2">




                <div className="col-lg-4 col-md-5">

                  <div className="contact-info-wrap">

                    <div className="single-contact-info">
                      <div className="contact-icon">
                        <i className="fa fa-phone" />
                      </div>
                      <div className="contact-info-dec">
                        <p>+012 345 678 102</p>
                        <p>+012 345 678 102</p>
                      </div>
                    </div>

                    <div className="single-contact-info">
                      <div className="contact-icon">
                        <i className="fa fa-globe" />
                      </div>
                      <div className="contact-info-dec">
                        <p>
                          <a href="mailto:urname@email.com">urname@email.com</a>
                        </p>
                        <p>
                          <a href="//urwebsitenaem.com">urwebsitenaem.com</a>
                        </p>
                      </div>
                    </div>

                    <div className="single-contact-info">
                      <div className="contact-icon">
                        <i className="fa fa-map-marker" />
                      </div>
                      <div className="contact-info-dec">
                        <p>Address goes here, </p>
                        <p>street, Crossroad 123.</p>
                      </div>
                    </div>

                    <div className="contact-social text-center">
                      <h3>Follow Us</h3>
                      <ul>
                        <li>
                          <a href="//facebook.com">
                            <i className="fa fa-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="//twitter.com">
                            <i className="fa fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="//instagram.com">
                            <i className="fa fa-instagram" />
                          </a>
                        </li>

                      </ul>
                    </div>

                  </div>
                </div>


                <div className="col-lg-8 col-md-7">
                  <div className="contact-form">

                    <Typography component="h1" variant="h5">
                      Contact Us
                    </Typography>

                    <form noValidate autoComplete="off">

                      <Grid container spacing={24} item xs={12}>

                        <Grid item xs={6}>
                          <TextField
                            label='Name*'
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            style={{ paddingRight: "20px" }}
                          />
                        </Grid>


                        <Grid item xs={6}>
                          <TextField
                            label='Email*'
                            margin="normal"
                            variant="outlined"
                            fullWidth

                            
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            label='Subject'
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                          />
                        </Grid>


                        <Grid item xs={12}>
                          <TextField
                            label='Descrption'
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={4}
                          />
                        </Grid>

                      </Grid>

                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                      >
                        Send
                        </Button>

                    </form>




                  </div>
                </div>













              </div>
            </div>
          </div>

        </Grid>
      </Container>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object
};

export default Contact;
