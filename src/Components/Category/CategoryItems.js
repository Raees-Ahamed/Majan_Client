import React, {useState, useEffect} from "react";
import Carousel from "react-multi-carousel";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from "axios";
import * as AppGlobal from "../../AppHelp/AppGlobal";

const CustomButtonGroupAsArrows = (props, { next, previous}) => {

  const classes = useStyles();

  return (
    <React.Fragment>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
          <Typography variant="h6" component="h1" className={classes.__categorySubHeader}>
            {props.categoryName}
        </Typography>

      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0
        }}
      >
        <IconButton aria-label="Prev" onClick={previous} >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>

        <IconButton aria-label="Nect" onClick={next}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </div>
    </React.Fragment>
  );
};


const CategoryItems = ({ deviceType , category }) => {
  const classes = useStyles();

  const [getTopItems, setTopItems] = useState({topItems: []});

  useEffect(() => {
    axios.get(AppGlobal.apiBaseUrl + `Selling/${category._id}`).then(function (response) {
      setTopItems({topItems: response.data});
    })
  },[]);

  return (
    <div
      style={{
        position: 'relative',
        top: 0
      }}
    >
      <Carousel
        ssr
        partialVisbile
        deviceType={deviceType}
        itemClass="image-item"
        responsive={responsive}
        autoPlaySpeed={3000}
        arrows={false}
        autoPlay
        infinite
        customButtonGroup={<CustomButtonGroupAsArrows categoryName={category.categoryName}/>}
        renderButtonGroupOutside
      >
        {getTopItems.topItems.map(topItem => {
          return (
            <div
              style={{
                marginTop: 50
              }}
            >
              <Grid>
                <Card className={classes.card} border={0} >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={topItem.imageUrl1}
                      title={topItem.item}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h7" color="textDanger">
                        {topItem.price}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {topItem.item}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
//----------------------------------------------------------------------------------------------------Objects
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30
  }
};
//-----------------------------------------------------------------------------------------------------Helping methods
const useStyles = makeStyles((theme) => ({
  card: {
    flexGrow: 1,
    maxWidth: 300,
  },
  Btnmargin: {
    margin: theme.spacing(1),
  },
  __categorySubHeader:{
    ...theme.typography.button
  }
}));
export default CategoryItems;
