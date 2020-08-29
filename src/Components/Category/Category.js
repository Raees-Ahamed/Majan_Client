import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const Category = () => {

    const tiers = [
      {
        title: 'Bonnet/hood',
        price: '0',
        description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
        buttonText: 'Shop Now',
        buttonVariant: 'outlined',
      },
      {
        title: 'Cowl screen',
        price: '15',
        description: [
          '20 users included',
          '10 GB of storage',
          'Help center access',
          'Priority email support',
        ],
        buttonText: 'Shop Now',
        buttonVariant: 'outlined',
      },
      {
        title: 'Front clip',
        price: '30',
        description: [
          '50 users included',
          '30 GB of storage',
          'Help center access',
          'Phone & email support',
        ],
        buttonText: 'Shop Now',
        buttonVariant: 'outlined',
      },
      {
        title: 'Bonnet/hood',
        price: '0',
        description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
        buttonText: 'Shop Now',
        buttonVariant: 'outlined',
      },
      {
        title: 'Cowl screen',
        price: '15',
        description: [
          '20 users included',
          '10 GB of storage',
          'Help center access',
          'Priority email support',
        ],
        buttonText: 'Shop Now',
        buttonVariant: 'outlined',
      },
      {
        title: 'Front clip',
        price: '30',
        description: [
          '50 users included',
          '30 GB of storage',
          'Help center access',
          'Phone & email support',
        ],
        buttonText: 'Shop Now',
        buttonVariant: 'outlined',
      },
    ];

    const useStyles = makeStyles((theme) => ({
      cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
      },
      cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
      },
      cardMedia: {
        paddingTop: '56.25%',
      },
    }));

    const classes = useStyles();

    return(
        <React.Fragment>
            <Container maxWidth="md" component="main">
              <Grid container spacing={5} alignItems="flex-end">
                {tiers.map((tier) => (
                    <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                      <Card>
                        <CardHeader
                            title={tier.title}
                            subheader={tier.subheader}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }}
                            className={classes.cardHeader}
                        />
                        <CardMedia
                            className={classes.cardMedia}
                            image="https://source.unsplash.com/random"
                            title="Image title"
                        />
                        <CardContent>
                          <div className={classes.cardPricing}>
                            <Typography component="h2" variant="h3" color="textPrimary">
                              ${tier.price}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                              /mo
                            </Typography>
                          </div>
                          <ul>
                            {tier.description.map((line) => (
                                <Typography component="li" variant="subtitle1" align="center" key={line}>
                                  {line}
                                </Typography>
                            ))}
                          </ul>
                        </CardContent>
                        <CardActions>
                          <Button fullWidth variant={tier.buttonVariant} color="primary">
                            {tier.buttonText}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                ))}
              </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Category;