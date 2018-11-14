import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { navigate, Redirect } from "@reach/router";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends Component {
  state = {
    user: "",
    pass: "",
      open: false,
      vertical: 'top',
      horizontal: 'center',
  };

  static getDerivatedStateFromProps(prop, state){
    console.log('getDerivatedStateFromProps=',prop, state);
  }

  componentDidMount() {
    console.log("did Mounted", this.props);
  }

    handleClick = state => () => {
        this.setState({ open: true, ...state });
    };

  componentWillReceiveProps(nextProps, nextContext) {
      console.log('componentWillReceiveProps=',nextProps, nextContext);
  }

  render() {

    const {horizontal, open, vertical} = this.state;

    console.log('local state=',horizontal, open, vertical);

    const {
      classes,
      authStore: { isAuth }
    } = this.props;

    return (
      <React.Fragment>
          <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={this.handleClose}
              ContentProps={{
                  'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Hubo un error en el acceso.</span>}
          />
        {isAuth === true ? (
                <Redirect to={`/home`} noThrow/>
        ) : (
          <div>
            
            <main className={classes.layout}>
            <CssBaseline />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={e => {
                    console.log("this state", this.state.user);
                    this.props.authStore.loginEffect({
                      email: this.state.user,
                      pass: this.state.pass
                    });

                    e.preventDefault();
                  }}
                >
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                      id="email"
                      name="email"
                      autoComplete="email"
                      onChange={e => this.setState({ user: e.target.value })}
                      autoFocus
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={e => this.setState({ pass: e.target.value })}
                    />
                  </FormControl>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign in
                  </Button>
                </form>
              </Paper>
            </main>
          </div>
        )}
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
