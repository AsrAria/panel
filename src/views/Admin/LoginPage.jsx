// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { css } from "glamor";
// MARK: ui import
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import loginStyle from "assets/styles/views/loginStyle.jsx";
// MARK: project imports
import * as actionCreators from "actions/admin.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";

// MARK: component

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  login = () => {
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  onChangeHandler = (e, name) => {
    let updateState = {};
    updateState[name] = e.target.value;
    this.setState(updateState);
  };

  render() {
    const { classes } = this.props;

    const { from } = this.props.location.state || {
      from: { pathname: "/" }
    };

    if (
      this.props.admin.activateTTL !== null &&
      this.props.admin.activateTTL.getTime() - new Date().getTime() >= 0
    ) {
      return <Redirect to={"/activate"} />;
    }

    if (this.props.admin.secretKey.length > 0) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <GridContainer justify="center">
          <Card style={{ marginTop: "25vh" }} className={classes.mainBox}>
            <CardHeader color="primary">
              <div>
                <div className={classes.cardTitleWhite}>Login</div>
                {this.props.app.loading > 0 ? (
                  <ReactLoading
                    className={classes.loadingItem}
                    type={"spin"}
                    height={30}
                    width={30}
                  />
                ) : null}
              </div>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: e => {
                        this.onChangeHandler(e, "username");
                      }
                    }}
                    onEnter={this.login}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: e => {
                        this.onChangeHandler(e, "password");
                      },
                      type: "password"
                    }}
                    onEnter={this.login}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter justify="left">
              <div className={classes.bottomOptions}>
                <Button
                  className={classes.submitButton}
                  color="primary"
                  onClick={this.login}
                >
                  Login
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridContainer>
        <ToastContainer
          toastClassName={css({
            fontSize: "14px",
            paddingLeft: "15px",
            paddingBottom: "15px"
          })}
        />
      </div>
    );
  }
}

// MARK: prop type validation

LoginPage.defaultProps = {
  app: {
    loading: 0
  },
  admin: {
    secretKey: ""
  },
  classes: {},
  location: {},
  login: () => {}
};

LoginPage.propTypes = {
  app: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  LoginPage,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      admin: state.admin
    };
  },
  loginStyle
);
