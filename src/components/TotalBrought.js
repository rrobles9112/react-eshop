import React, { PureComponent, Component } from "react";
import ShopIcon from "@material-ui/icons/Shop";
import { withStyles } from "@material-ui/core/styles";
import ProductStore from "../models/ProductStore";
import Badge from "@material-ui/core/es/Badge/Badge";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    margin:{
        margin: theme.spacing.unit * 1,
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



class TotalBrought extends PureComponent {

    componentDidMount() {

    }

    render() {

        const { classes, proStore } = this.props;
        console.log(proStore)
        return (
           <React.Fragment>
               <Badge className={classes.margin} badgeContent={this.props.proStore.getBadgeTotalBroughtProduct()}
                      color={'secondary'}>
                   <ShopIcon className={classes.icon}/>
               </Badge>
           </React.Fragment>

        );
    }
}

const BadgeShopWithStyles = withStyles(styles)(BadgeShop);

class BadgeShopConnected extends Component {
    render() {


        return (
            <ProductStore context='shop' pure>
                {(store) => (
                    <BadgeShopWithStyles proStore={store}/>
                )}
            </ProductStore>

        );
    }
}


export default BadgeShopConnected;
