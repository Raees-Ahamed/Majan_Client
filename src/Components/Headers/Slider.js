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
import '../../Assets/style/scss/Example.scss';







function Banner(props) {
    debugger;
    if (props.newProp) console.log(props.newProp)
    let items = [];
    const item = props.item

    const media = (
        <Grid item xs={12 / 1} key={item.Name}>
            <CardMedia
                className="Media"
                image={item.Image}
                title={item.Name}
            >
            </CardMedia>
        </Grid>
    )

    items.push(media);

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
        Name: "Dicount for HSBC Special",
        Image: "https://laz-img-cdn.alicdn.com/tfs/TB19tY2NRr0gK0jSZFnXXbRRXXa.jpg#width=1920&height=400"
    },
    {
        Name: "Dicount for cards",
        Image: "https://www.wasi.lk/wp-content/uploads/2020/06/wasilk-june-2020-offer-installments-1920x400-1.png"
    },

    {
        Name: "Dicount for oil",
        Image: "https://laz-img-cdn.alicdn.com/tfs/TB1IPFshCR26e4jSZFESuvwuXXa.jpg#width=720&height=400"
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
            interval: 8000
        }

        autoBind(this);
    }



    render() {
        return (
            <div style={{ marginTop: "0px", color: "#494949", width: "100%" }}>

                <Carousel
                    className="Example"
                    autoPlay={this.state.autoPlay}
                    timer={this.state.timer}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                    navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                    navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
                    interval={this.state.interval}
                >
                    
                    {
                        items.map((item, index) => {
                            return <Banner item={item} key={index} />
                        })
                    }
                </Carousel>

                {"\n\n"}


            </div>

        )
    }
}



export default SliderCarousel;