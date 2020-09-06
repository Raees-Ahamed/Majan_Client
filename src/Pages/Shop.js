import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CategoryHeader from "../Components/Category/Categoryheader";
import CssBaseline from '@material-ui/core/CssBaseline';
import GridItems from "../Components/Items/GridItems";
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Container from "@material-ui/core/Container";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        marginTop:'15px',
        float:'right'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    paginationMargin: {
        marginTop: theme.spacing(2),
        float:'right'
    }
}));

const Shop = (props) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <CategoryHeader />
                <Container maxWidth={false}>
                    <Paper component="form" className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Which item you are looking for...."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange = {props.filterItems}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Container>

                <GridItems />

                <Container maxWidth={false}>
                    <div className={classes.paginationMargin}>
                        <Pagination count={10} color="primary" />
                    </div>
                </Container>
            </main>
        </React.Fragment>
    );
}

export default Shop;
