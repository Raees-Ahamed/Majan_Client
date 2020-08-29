import React from 'react';
import NavigationHeader from "../Components/Headers/NavigationHeader";
import Footer from "../Components/Footer/Footer";
import CategoryHeader from "../Components/Category/Categoryheader";
import CssBaseline from '@material-ui/core/CssBaseline';
import GridItems from "../Components/Items/GridItems";

export default function Shop() {
    return (
        <React.Fragment>
            <CssBaseline />
            <NavigationHeader />
            <main>
                <CategoryHeader />
                <GridItems />
            </main>
            <Footer />
        </React.Fragment>
    );
}
