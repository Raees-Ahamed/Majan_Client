import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import {makeStyles} from "@material-ui/core/styles";

const Footer = () => {

    function Copyright() {
      return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
      );
    }

    const useStyles = makeStyles((theme) => ({
      footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
        },
      },
    }));

    const classes = useStyles();

    return(
        <React.Fragment>
            <Container maxWidth="md" component="footer" className={classes.footer}>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Container>
        </React.Fragment>
    )
}

export default Footer;