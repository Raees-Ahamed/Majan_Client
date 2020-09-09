import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import * as AppGlobal from "../AppHelp/AppGlobal";
import NumberFormat from "react-number-format";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

const OrderHistory = () => {
  const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMedia: {
      paddingTop: "56.25%", // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    paginationMargin: {
      marginTop: theme.spacing(2),
      float: "right",
    },
  }));

  let history = useHistory();
  const queryString = window.location.search;

  //   const filterItems = (searchString) => {
  //     let currentProducts = getItems.products;
  //     let copyOfCurrentItems = [...currentProducts];

  //     let filteredItems = [];

  //     let searchingString = searchString.replace(/\s+/g, "").toLowerCase();

  //     copyOfCurrentItems.map((order) => {
  //       let order = product.name.replace(/\s+/g, "").toLowerCase();
  //       let productDesc = product.description.replace(/\s+/g, "").toLowerCase();

  //       if (
  //         productName.includes(searchingString) ||
  //         productDesc.includes(searchingString)
  //       ) {
  //         filteredItems.push(product);
  //       }
  //     });

  //     if (searchingString != "" && filteredItems.length == 0) {
  //       setTemporaryItems({ products: "Empty data" });
  //     } else {
  //       setTemporaryItems({ products: filteredItems });
  //     }
  //   };

  const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"]);
  const [getItems, setItems] = useState({
    orders: [],
  });

  useEffect(() => {
      console.log(cookies.jwtToken);
    axios
      .get(AppGlobal.apiBaseUrl + "Order/History", {
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": cookies.jwtToken,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setItems({ products: response.data });
      });
  }, []);

  const [getTemporaryItems, setTemporaryItems] = useState({ orders: [] });

  const classes = useStyles();

  //props.biRef.callToGridItems = filterItems;

  const [page, setPage] = useState(1);

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const showSingleItem = (itemId) => {
    history.push(`/item?id=${itemId}`);
  };

  let gridItems = null;

  if (getTemporaryItems.orders == "Empty data") {
    gridItems = (
      <Container maxWidth={false} style={{ alignItems: "center" }}>
        <Alert
          color="warning"
          severity="info"
          style={{ fontSize: "14px", marginTop: "20px", fontWeight: "bold" }}
        >
          Sorry ! The item you are looking for not found.
        </Alert>
      </Container>
    );
  } else if (getTemporaryItems.orders.length > 0) {
    gridItems = getTemporaryItems.orders.map((product) => {
      return (
        <Grid item key={product.id} xs={6} sm={4} md={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={product.imageUrl1}
              title={product.name}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography>
                {product.description}
                <br />
                <br />
                Unit Price:{" "}
                <NumberFormat
                  value={product.unitPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rs "}
                />
                <br />
                <br />
                Available Qty: {product.availableQuantity}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SearchIcon />}
                onClick={() => showSingleItem(product._id)}
              >
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  } else {
    gridItems = getItems.orders.map((product) => {
      return (
        <Grid item key={product.id} xs={6} sm={4} md={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={product.imageUrl1}
              title={product.name}
            />
            <CardContent className={classes.cardContent}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ fontSize: "18px" }}
              >
                {product.name}
              </Typography>
              <Typography>
                {product.description}
                <br />
                <br />
                Unit Price:{" "}
                <NumberFormat
                  value={product.unitPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rs "}
                />
                <br />
                <br />
                Available Qty: {product.availableQuantity}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SearchIcon />}
                onClick={() => showSingleItem(product._id)}
              >
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  }
  return (
    <React.Fragment>
      <Container className={classes.cardGrid} maxWidth={false}>
        {/* End hero unit */}
        <Grid container spacing={6}>
          {gridItems}
        </Grid>
      </Container>

      <Container maxWidth={false} style={{ float: "right" }}>
        <div className={classes.paginationMargin}>
          <Pagination
            count={getItems.orders.length}
            page={page}
            color="primary"
            onChange={handlePagination}
          />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default OrderHistory;
