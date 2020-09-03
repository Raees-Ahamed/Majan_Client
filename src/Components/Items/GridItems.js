import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const GridItems = () => {
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
  }));

  //const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9,10];

  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={10}>
        <Grid xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://image.made-in-china.com/2f0j00birGukpnacqU/50890-TBA-A82-Engine-Mount-Base-de-Motor-Rubber-Mounting-for-Honda-Civic-Japanese-car-spare-parts.jpg"
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
              Engine Mount
              </Typography>
              <Typography>
              50890-TBA-A82 Engine Mount Base de Motor Rubber Mounting for Honda Civic Japanese car spare parts
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://www.dhresource.com/0x0/f2/albu/g2/M00/96/9B/rBVaG1Y4VW6AeQD0AANESS3IZPI164.jpg/oversee-gasket-cylinder-11141-93950-00-for.jpg"
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Gasket
              </Typography>
              <Typography>
              OVERSEE GASKET,CYLINDER 11141-93950-00 For fitting Suzuki DT15 DT9.9 Marine 15HP outboard spare engine parts
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://lh3.googleusercontent.com/proxy/scRYBPmUwGvX0PM7FmzPSXu0s_j9WrJ0kJBqOBPrbZ3J7clsAekGdsNCM0Q-9uJpeF1aZaackr-mpfDFWHLsFUsfdLDt6L7gRdfceRvrwkK7UdLu7Z4"
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
              Daewoo DH55 Rotary Group Swing Motor Spare Parts Components
              </Typography>
              <Typography>
              Hydraulic Components, Hydraulic Pump and Power Train Tags: Daewoo Swing Motor Spare Parts, DH55 Rotary Group, DH55 Swing Motor Components
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvqLn4JjQCVHcBs2pmI0IoOoH9ouf0VCfDfw&usqp=CAU"
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
              Engine Control Unit
              </Typography>
              <Typography>
              Mercedes Engine Control Unit - Automotive Engine Part Car Product Design Machine
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSqGu6W-XtFDOb7AW1IbANiYBrgJqe50lVy1A&usqp=CAU"
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
              Spark Plug
              </Typography>
              <Typography>
              Spare Parts Cylinder Spark Plug for Earrow Outboard Motor Marine
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://m.ceirch.com/uploaded_images/c58182-replace-kawasaki-m2x170-m2x210-hydraulic-swing-motor-spare-parts.jpg"
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
              KAWASAKI M2X170 M2X210 Hydraulic Swing Motor Spare Parts
              </Typography>
              <Typography>
              What is Replace KAWASAKI M2X170 M2X210 Hydraulic Swing Motor Spare Parts in mechanical engineering? Pump Spare Parts Manufacturing Service . Yes End Cap Groove Upload your CAD file for an Steel Bearing Outer Ring Material instant.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GridItems;
