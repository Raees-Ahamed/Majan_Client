import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useCookies } from 'react-cookie';
import GlobalData from "../Components/Global/Global";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop:'50px',
        paddingBottom:'30px',
        border: '0.5px solid black',
        boxShadow: '2px 2px'
    },
    media: {
        height: 200,
        width: 200,
        paddingTop: '56.25%', // 16:9
        marginTop:'30'
    },
    avatar: {
        backgroundColor: red[500],
    },
    itemDescriptionSize: {
        fontSize:'18px'
    },
    paper: {
        height: 200,
        width: 200,
    },
    button: {
        margin: theme.spacing(1),
        float:'right'
    },
}));

 const SingleItem = () => {

    const classes = useStyles();

    const [cookies, setCookie] = useCookies(['cartItems']);

    const [getImageComponent, setImageComponent] = useState({
        isImageComponentShow: null
    });

     const {value,setValue} = useContext(GlobalData);

    // const [getTotalItems, setTotalItems] = useState({
    //      totalItems: cookies.cartItems.length
    // })

     const [getQty, setQty] = useState({
         qty: 0
     })

     let images = [
         {
             url:"https://unsplash.it/800/300?image=1",
             title:"image title 1"
         },
         {
             url:"https://unsplash.it/300/800?image=2",
             title:"image title 2"
         }
     ]

     const handleClose = () => {
         setImageComponent({isImageComponentShow: null})
     }

     const showImages = () => {
         setImageComponent({isImageComponentShow: <Lightbox images={images} onClose={handleClose}/>})
     }

     const addQty = (event) => {
         setQty({qty:event.target.value});
     }

     const addToCart = () => {
         let newItem = "";
         let qty = getQty.qty;
        if(cookies.cartItems){
            let storedData = cookies.cartItems;
            newItem = {name:"Item1",qty:qty, unitPrice:"100", imageUrl:'https://source.unsplash.com/random'};
            storedData.push(newItem);
            setCookie('cartItems', JSON.stringify(storedData));
        }else{
            let cartItems = [];
            newItem = {name:'Item1',qty:qty, unitPrice:'100', imageUrl:'https://source.unsplash.com/random'};
            cartItems.push(newItem);
            setCookie('cartItems', JSON.stringify(cartItems));
        }

         setValue({
             totalItems: (typeof(cookies.cartItems) !== 'undefined') ? cookies.cartItems.length : 1
         })
     }

    return (
        <React.Fragment>
            <main>
                <Container maxWidth="md">
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <div>
                                    <h1>Shrimp and Chorizo Paella</h1>
                                    <h2>Available Quantity: 6</h2>
                                </div>
                            }
                        />

                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={2}>
                                {[0, 1, 2,3].map((value) => (
                                    <Grid key={value} item>
                                        <Paper className={classes.paper} >
                                            <CardMedia
                                                className={classes.media}
                                                image="https://source.unsplash.com/random"
                                                title="Paella dish"
                                            />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item xs={12} style={{'paddingTop':'25px'}}>
                            <Grid container justify="center">
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    startIcon={<ZoomInIcon />}
                                    onClick={showImages}
                                >
                                    Zoom
                                </Button>
                            </Grid>
                        </Grid>

                        {getImageComponent.isImageComponentShow}

                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.itemDescriptionSize}>
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <TextField id="outlined-basic" label="Quantity" defaultValue='6' variant="outlined" onChange={addQty}/>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<AddShoppingCartIcon />}
                                onClick={addToCart}
                            >
                                Add to Cart
                            </Button>
                        </CardActions>
                    </Card>
                </Container>
            </main>
        </React.Fragment>
    );
 }

export default SingleItem;