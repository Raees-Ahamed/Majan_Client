import React, { useState, useEffect } from "react";
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
import * as AppGlobal from "../../AppHelp/AppGlobal";
import NumberFormat from "react-number-format";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

const GridItems = (props) => {
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
  const urlParams = new URLSearchParams(queryString);
  const categoryId = urlParams.get("category");

  const filterItems = (searchString) => {
    let currentProducts = getItems.products;
    let copyOfCurrentItems = [...currentProducts];

    let filteredItems = [];

    let searchingString = searchString.replace(/\s+/g, "").toLowerCase();

    copyOfCurrentItems.map((product) => {
      let productName = product.name.replace(/\s+/g, "").toLowerCase();
      let productDesc = product.description.replace(/\s+/g, "").toLowerCase();

      if (
        productName.includes(searchingString) ||
        productDesc.includes(searchingString)
      ) {
        filteredItems.push(product);
      }
    });

    if (searchingString != "" && filteredItems.length == 0) {
      setTemporaryItems({ products: "Empty data" });
    } else {
      setTemporaryItems({ products: filteredItems });
    }
  };

  const [getItems, setItems] = useState({
    products: [],
  });

  useEffect(() => {
    if (categoryId == null) {
      axios.get(AppGlobal.apiBaseUrl + "Product").then(function (response) {
        console.log(response.data);
        setItems({ products: response.data });
      });
    } else {
      axios
        .get(AppGlobal.apiBaseUrl + `ProductCategory/${categoryId}`)
        .then(function (response) {
          console.log(response.data);
          setItems({ products: response.data });
        });
    }
  }, []);

  const [getTemporaryItems, setTemporaryItems] = useState({ products: [] });

  const classes = useStyles();

  props.biRef.callToGridItems = filterItems;

  const [page, setPage] = useState(1);

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const showSingleItem = (itemId) => {
    history.push(`/item?id=${itemId}`);
  };

  let gridItems = null;

  if (getTemporaryItems.products == "Empty data") {
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
  } else if (getTemporaryItems.products.length > 0) {
    gridItems = getTemporaryItems.products.map((product) => {
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
    gridItems = getItems.products.map((product) => {
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
            count={getItems.products.length}
            page={page}
            color="primary"
            onChange={handlePagination}
          />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default GridItems;
