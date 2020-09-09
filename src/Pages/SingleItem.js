import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
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
import axios from "axios";
import * as AppGlobal from "../AppHelp/AppGlobal";
import NumberFormat from 'react-number-format';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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

    const [getItemDetails, setItemDetails] = useState({details: []});

     const [getImages, setImages] = useState({images: []});

     const {value,setValue} = useContext(GlobalData);

     const [open, setOpen] = React.useState(false);

     const queryString = window.location.search;

     const urlParams = new URLSearchParams(queryString);

     const itemId = urlParams.get('id');

     const [getQty, setQty] = useState({qty: ""})

     const [currency, setCurrency] = React.useState('LKR');

     useEffect(() => {
         if(itemId == null){
             alert('Invalid');
         }else{
             axios.get(AppGlobal.apiBaseUrl + `Product/${itemId}`).then(function (response) {
                 const details = [
                     {
                         name :response.data.name,
                         description :response.data.description,
                         unitPrice :response.data.originPrice,
                         availableqty :response.data.availableQuantity,
                         defaultPrice: response.data.originPrice,
                         imageUrl: response.data.imageUrl1
                     }
                 ]

                 setItemDetails({details: details});

                 setQty({qty: '8'});

                 setImages({images:[
                         {url: response.data.imageUrl1},
                         {url: response.data.imageUrl2},
                         {url: response.data.imageUrl3},
                         {url: response.data.imageUrl4}
                         ]});
             })

             axios.get('https://api.currencyscoop.com/v1/currencies?api_key=d8d6b7e62bfa78e649a4950291f65c4d&type=fiat').then(function (response) {
                 ///console.log(response.data.response.fiats);
             })
         }
     },[]);

     let images = getImages.images;

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
         setOpen(true);
         let newItem = "";
         let qty = getQty.qty;
        if(cookies.cartItems){
            let storedData = cookies.cartItems;
            newItem = {name:getItemDetails.details[0].name,qty:qty, unitPrice:getItemDetails.details[0].unitPrice, imageUrl:getItemDetails.details[0].imageUrl};
            storedData.push(newItem);
            setCookie('cartItems', JSON.stringify(storedData));
        }else{
            let cartItems = [];
            newItem = {name:getItemDetails.details[0].name, qty:qty, unitPrice:getItemDetails.details[0].unitPrice, imageUrl:getItemDetails.details[0].imageUrl};
            cartItems.push(newItem);
            setCookie('cartItems', JSON.stringify(cartItems));
        }

         setValue({
             totalItems: (typeof(cookies.cartItems) !== 'undefined') ? cookies.cartItems.length : 1
         })

         setTimeout(function(){ setOpen(false); }, 2500);
     }

     if(getItemDetails.details.length > 0){
         //console.log(getItemDetails.details[0]);
     }

     const handleChange = (event) => {
         setCurrency(event.target.value);
         axios.get('https://api.currencyscoop.com/v1/latest?api_key=d8d6b7e62bfa78e649a4950291f65c4d&base=LKR&symbols='+event.target.value).then(function (response) {
             let rate = 0;
             if(event.target.value == 'USD'){
                 rate = response.data.response.rates.USD;
             }else if(event.target.value == 'AED'){
                 rate = response.data.response.rates.AED;
             }else if(event.target.value == 'AUD'){
                 rate = response.data.response.rates.AUD;
             }else{
                 rate = 1;
             }

             let foreignPrice = 0;
             let currentItems = [...getItemDetails.details];
             if(event.target.value == 'LKR'){
                 console.log(getItemDetails.details[0].defaultPrice);
                 foreignPrice = getItemDetails.details[0].defaultPrice * rate;
             }else{
                 foreignPrice = currentItems[0].unitPrice * rate;
             }
             currentItems[0].unitPrice = foreignPrice;
             setItemDetails({details: currentItems});
         })
     };

    return (
        <React.Fragment>
            <main>
                <Container maxWidth="md">
                    <Card className={classes.root}>
                        <Container>
                            <br/>
                            <InputLabel id="demo-simple-select-label">Select your currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currency}
                                onChange={handleChange}
                            >
                                <MenuItem value={'LKR'}>LKR</MenuItem>
                                <MenuItem value={'USD'}>USD</MenuItem>
                                <MenuItem value={'AED'}>AED</MenuItem>
                                <MenuItem value={'AUD'}>AUD</MenuItem>
                            </Select><br/><br/>

                            <p style={{'fontSize':'20px'}}>{(getItemDetails.details.length > 0) ? getItemDetails.details[0].name : ""}</p>
                            <p style={{'fontSize':'20px'}}>Available Quantity: {(getItemDetails.details.length > 0) ? getItemDetails.details[0].availableqty : ""}</p>
                            <p style={{'fontSize':'20px'}}>Unit Price: {(getItemDetails.details.length > 0) ? <NumberFormat value={getItemDetails.details[0].unitPrice} displayType={'text'} thousandSeparator={true} prefix={currency+' '} /> : ""}</p>
                        </Container><br/><br/>

                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={2}>
                                {getImages.images.map((image) => (
                                    <Grid key={value} item>
                                        <Paper className={classes.paper} >
                                            <CardMedia
                                                className={classes.media}
                                                image={image.url}
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
                                {(getItemDetails.details.length > 0) ? getItemDetails.details[0].description : ""}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <TextField id="outlined-basic" label="Quantity" defaultValue= {getQty.qty} variant="outlined" onChange={addQty}/>
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

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Item successfully added to the cart.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
 }

export default SingleItem;