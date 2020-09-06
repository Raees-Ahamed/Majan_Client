import React from 'react';
import SliderCarousel from '../Components/Headers/Slider';
import Category from '../Components/Category/Category';
import CssBaseline from '@material-ui/core/CssBaseline';

const Home = () => {
    return(
        <React.Fragment>
            <CssBaseline />
            <SliderCarousel />
            <Category />
        </React.Fragment>
    )
}

export default Home;