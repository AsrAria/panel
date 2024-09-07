// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class UserDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    return {
      name: ""
    };
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {
    var data = {
      name: this.state.name
    };

    this.props.updateFormCallBack("", data, this.state);
  };

  createProfileTab() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              value={this.state.email}
              labelText="Email"
              id="email"
              formControlProps={{
                disabled: true,
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.name}
              labelText="Name"
              id="name"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "name", "text");
                }
              }}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  render() {
    return (
      <div style={{ width: "900px" }}>
        {this.createLoadingDialog()}
        {this.createProfileTab()}
      </div>
    );
  }
}

// MARK: prop type validation

UserDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  UserDialog,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app,
      admin: state.admin
    };
  },
  dialogStyle
);
