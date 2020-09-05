import React from 'react';
import NavigationHeader from "../Components/Headers/NavigationHeader";
import SliderCarousel from '../Components/Headers/Slider';
import Category from '../Components/Category/Category';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from "../Components/Footer/Footer";

const Home = () => {
    return(
        <React.Fragment>
            <CssBaseline />
            <NavigationHeader />
            <SliderCarousel />
            <Category />
            <Footer />
        </React.Fragment>
    )
}

export default Home;