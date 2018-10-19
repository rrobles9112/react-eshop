import React, {Component, PureComponent} from "react";
import AppBar from "@material-ui/core/AppBar";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/ExitToApp";
import { withStyles } from "@material-ui/core/styles";
import AuthStore from "./../models/AuthStore";
import BadgeShop from "./BadgeShop";
import { Link } from "@reach/router";
const styles = theme => ({
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
    link:{
      textDecoration:"none",
      color:'inherit'
    },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

class MainLayout extends PureComponent {


    render() {
        const {classes} = this.props;
        return (
            <AuthStore context="Auth" pure>
                {({logoutEffect}) => (
                    <React.Fragment>
                        {console.log(12)}
                        <CssBaseline/>
                        <AppBar position="fixed" className={classes.appBar}>
                            <Toolbar>
                                <Grid
                                    container={true}
                                    spacing={24}
                                    direction={`row`}
                                    alignItems={`center`}
                                    justify={`flex-start`}
                                >
                                    <Grid item={true} xs={6}>
                                        <Link to={'/home'} className={classes.link}>
                                            <Grid
                                                container={true}
                                                justify={`flex-start`}
                                                alignItems={`center`}
                                            >
                                                <CameraIcon className={classes.icon}/>

                                                <Typography variant="h6" color="inherit" noWrap>
                                                    Products
                                                </Typography>
                                            </Grid>
                                        </Link>

                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <Grid container justify="flex-end" alignItems="center">
                                            <Grid item={true} xs={3}>
                                                <Link to={`checkout`} className={classes.link}>
                                                    <BadgeShop/>
                                                </Link>
                                            </Grid>
                                            <Grid item={true} xs={1}>
                                                <LockIcon onClick={() => logoutEffect()}
                                                          style={{cursor: 'pointer'}}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                        <main>{this.props.children}</main>
                        {/* Footer */}
                        <footer className={classes.footer}>
                            <Typography variant="h6" align="center" gutterBottom>
                                Footer
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                align="center"
                                color="textSecondary"
                                component="p"
                            >
                                Something here to give the footer a purpose!
                            </Typography>
                        </footer>
                        {/* End footer */}
                    </React.Fragment>

                )}
            </AuthStore>
        );
    }
}

export default withStyles(styles)(MainLayout);
