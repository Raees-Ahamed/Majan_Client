import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavigationHeader from "../Components/Headers/NavigationHeader";
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from "../Components/Footer/Footer";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const SingleItem = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return(
        <React.Fragment>
            <CssBaseline />
            <NavigationHeader />
            <Container maxWidth="sm">
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                            be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Container>

            <Footer />
        </React.Fragment>
    )
}

export default SingleItem;