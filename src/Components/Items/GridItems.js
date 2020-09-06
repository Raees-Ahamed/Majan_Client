import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

const GridItems = () =>{

    const useStyles = makeStyles((theme) => ({
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
        },
        cardContent: {
            flexGrow: 1,
        }
    }));

    const filterItems = () => {
        alert('ok');
    }

    //const products = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20];

    const products = [
        {id:1, name:'Item1', description:'testing description1'},
        {id:2, name:'Item2', description:'testing description2'},
        {id:3, name:'Item3', description:'testing description3'},
        {id:4, name:'Item4', description:'testing description4'},
        {id:5, name:'Item5', description:'testing description5'},
        {id:6, name:'Item6', description:'testing description6'},
        {id:7, name:'Item7', description:'testing description7'},
        {id:8, name:'Item8', description:'testing description8'},
        {id:9, name:'Item9', description:'testing description9'},
        {id:10,name:'Item10', description:'testing description10'},
        {id:11,name:'Item11', description:'testing description11'},
        {id:12, name:'Item12', description:'testing description12'},
        {id:13, name:'Item13', description:'testing description13'},
        {id:14, name:'Item14', description:'testing description14'},
        {id:15, name:'Item15', description:'testing description15'},
        {id:16, name:'Item16', description:'testing description16'},
        {id:17, name:'Item17', description:'testing description17'},
        {id:18, name:'Item18', description:'testing description18'},
        {id:19, name:'Item19', description:'testing description19'},
        {id:20, name:'Item20', description:'testing description20'}
    ]

    const classes = useStyles();

    return(
        <Container className={classes.cardGrid} maxWidth={false}>
            {/* End hero unit */}
            <Grid container spacing={6}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={6} sm={4} md={3}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://source.unsplash.com/random"
                                title={product.name}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                <Typography>
                                    {product.description}
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
                ))}
            </Grid>
        </Container>
    )
}

export default GridItems;