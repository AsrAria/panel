// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
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

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.admin.name,
      email: props.admin.email
    };
  }

  updateProfile = () => {
    const { name, email } = this.state;
    this.props.updateProfile(name, email);
  };

  onChangeHandler = (e, name) => {
    let updateState = {};
    updateState[name] = e.target.value;
    this.setState(updateState);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer justify="center">
          <GridItem style={{ marginTop: "5vh" }} xs={7} sm={7} md={7}>
            <Card>
              <CardHeader color="primary">
                <div>
                  <div className={classes.cardTitleWhite}>Edit account</div>
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
                      value={this.state.name}
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "name");
                        }
                      }}
                      onEnter={this.updateProfile}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      value={this.state.email}
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.onChangeHandler(e, "email");
                        }
                      }}
                      onEnter={this.updateProfile}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter justify="left">
                <div className={classes.bottomOptions}>
                  <Button
                    className={classes.submitButton}
                    color="primary"
                    onClick={this.updateProfile}
                  >
                    Save
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

UpdateProfile.defaultProps = {
  app: {
    loading: 0
  },
  classes: {},
  updateProfile: () => {}
};

UpdateProfile.propTypes = {
  app: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  UpdateProfile,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      admin: state.admin
    };
  },
  loginStyle
);
