import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import "semantic-ui-css/semantic.min.css";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
import UAParser from "ua-parser-js";
import CategoryItems from "./CategoryItems";
import Section from "./Section";


import { styled } from '@material-ui/core/styles';



const Category = ({ deviceType }) => {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid className={classes.root}  >

      <Typography variant="h5" component="h2" className={classes.__categoryHeader}>
        Best Selling Products
        </Typography>

      {categories.map((category) => (

        <Card className={classes.card}>
          <CardContent>

            <React.Fragment>
              <Section>
                <CategoryItems deviceType={deviceType} category={category} />
              </Section>

            </React.Fragment>

          </CardContent>
          <CardActions className={classes.footer}>
            <BtnSeeMoreStyle>See More</BtnSeeMoreStyle>
          </CardActions>
        </Card>

      ))}
    </Grid>
  );
};



//------------------------------------------------------------------------------------------Obejcts

const categories = [

  {
    categoryId: 1,
    categoryName: 'Automotive Care'
  },
  {
    categoryId: 2,
    categoryName: 'Automotive Paint'
  },
  {
    categoryId: 3,
    categoryName: 'Automotive Modifykits'
  },
  {
    categoryId: 4,
    categoryName: 'Automotive SpareParts'
  }


]



//-------------------------------------------------------------------------------------------Helping methods

Category.getInitialProps = ({ req }) => {
  let userAgent;
  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  const parser = new UAParser();
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || "desktop";
  return { deviceType };
};


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  footer: {
    justifyContent: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  __categoryHeader: {
    color: "red",
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  card: {
    marginBottom: '60px'
  }



}));



const BtnSeeMoreStyle = styled(Button)({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 0,
  borderRadius: "5em",
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 40,
  padding: '0 30px',
});



export default Category;
