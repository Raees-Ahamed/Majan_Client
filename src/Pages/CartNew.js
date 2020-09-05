import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import TextField from "material-ui/TextField";
import { AvSortByAlpha } from 'material-ui/svg-icons';

import CloseIcon from '@material-ui/icons/Close';
import Link from "@material-ui/core/Link";


import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';



function createData(code, image, name, quantity) {
    return { code, image, name, quantity };
}



const rows = [
    createData('ITEM1', 'image', 'Paint', 100),
    createData('ITEM2', 'image1', 'Paint1', 100),
    createData('ITEM3', 'image2', 'Paint2', 100),
    createData('ITEM4', 'image3', 'Paint3', 100),
];



const columns = [


    {
        id: 'image',
        label: 'image',
        minWidth: 70,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'name',
        label: 'name',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'quantity',
        label: 'quantity',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'addToCart',
        label: 'Add To Cart',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'action',
        label: 'action',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }




]







const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 20,

    },
    container: {
        maxHeight: 440,
    },
    curveBtn:{
        borderRadius: "5em"

    }
}));

const Cart = (props) => {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((x, i) => (
                                <TableCell key={`thc-${i}`}>
                                    <div
                                        style={{
                                            display: "flex",
                                            align: x.align,
                                            minWidth: x.minWidth,
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {x.label}

                                    </div>
                                </TableCell>

                            ))}


                            <TableCell />
                            <TableCell />


                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {rows.map((x, i) =>
                        
                            row(
                                x,
                                i,
                                columns)
                        )}

                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
}








const row = (
    x,
    i,
    columns,
) => {

    return (
        <TableRow key={`tr-${i}`} selectable={false}>


            <TableCell >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </TableCell>


            {columns.slice(-4,-2).map((y, k) => (
                <TableCell key={`trc-${k}`}>
                    {y.format && typeof x[y.id] === 'number' ? y.format(x[y.id]) : x[y.id]}
                </TableCell>
            ))}

            <TableCell >
                <BtnSeeMoreStyle variant="contained" >Selectt Option</BtnSeeMoreStyle>
            </TableCell>

            <TableCell>
                <Link variant="button" color="textPrimary" href="javascript:void(0)">
                    <CloseIcon />
                </Link>
            </TableCell>






        </TableRow>




    );
};


const BtnSeeMoreStyle = styled(Button)({
    backgroundColor:'#A749FF',
    border: 0,
    borderRadius: "5em",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 35,
    padding: '0 30px',
    maxWidth:'50%',
    
  });

export default Cart;