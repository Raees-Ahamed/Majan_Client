import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Carousel from 'react-material-ui-carousel';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel
} from '@material-ui/core';

import autoBind from "auto-bind"
import '../../style/Example.scss';

// const Slider = () => {

//     const useStyles = makeStyles((theme) => ({
//         heroContent: {
//             padding: theme.spacing(8, 0, 6),
//         },
//     }));

//     const classes = useStyles();

//     return(
//         <React.Fragment>
//             <Container maxWidth="sm" component="main" className={classes.heroContent}>
//                 <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
//                     Pricing
//                 </Typography>
//                 <Typography variant="h5" align="center" color="textSecondary" component="p">
//                     Quickly build an effective pricing table for your potential customers with this layout.
//                     It&apos;s built with default Material-UI components with little customization.
//                 </Typography>
//             </Container>
//         </React.Fragment>
//     )
// }







function Banner(props) {
    if (props.newProp) console.log(props.newProp)
    const contentPosition = props.contentPosition ? props.contentPosition : "left"
    const totalItems = props.length ? props.length : 1;
    const mediaLength = totalItems - 1;

    let items = [];
    const content = (
        <Grid item xs={12 / totalItems} key="content">
            <CardContent className="Content">
                <Typography className="Title">
                    {props.item.Name}
                </Typography>

                <Typography className="Caption">
                    {props.item.Caption}
                </Typography>

                <Button variant="outlined" className="ViewButton">
                    Order Now
                </Button>
            </CardContent>
        </Grid>
    )


    for (let i = 0; i < totalItems; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={item.Name}>
                <CardMedia
                    className="Media"
                    image={item.Image}
                    title={item.Name}
                >
   
                </CardMedia>

            </Grid>
        )

        items.push(media);
    }



    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    )
}

const items = [

    
    {
        Name: "Electronics",
        Caption: "Electrify your friends!",
        contentPosition: "right",
        Items: [
            {
                Name: "Macbook Pro",
                Image: "https://laz-img-cdn.alicdn.com/tfs/TB1IPFshCR26e4jSZFESuvwuXXa.jpg#width=720&height=400"
            }

        ]
    },
    {
        Name: "Home Appliances",
        Caption: "Say no to manual home labour!",
        contentPosition: "right",
        Items: [
            {
                Name: "Washing Machine WX9102",
                Image: "https://source.unsplash.com/featured/?washingmachine"
            }

        ]
    }

]

class SliderCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoPlay: true,
            timer: 500,
            animation: "fade",
            indicators: true,
            timeout: 500,
            navButtonsAlwaysVisible: false,
            navButtonsAlwaysInvisible: false,
            interval : 8000
        }

        autoBind(this);
    }



    render() {
        return (
            <div style={{ marginTop: "0px", color: "#494949" }}>

                <Carousel
                    className="Example"
                    autoPlay={this.state.autoPlay}
                    timer={this.state.timer}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                    navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                    navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
                    interval = {this.state.interval}
                >
                    {
                        items.map((item, index) => {
                            return <Banner item={item} key={index} contentPosition={item.contentPosition} />
                        })
                    }
                </Carousel>

                ~{"\n\n"}


            </div>

        )
    }
}



export default SliderCarousel;