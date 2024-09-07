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

class AddPackageDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    return {
      email: "",
      start_date: "",
      end_date: "",
      budget: 0
    };
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {
    if (
      this.checkIsEmptyTextWithNameError(this.state.email, "Email") ||
      this.checkPatternWithNameError(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$/,
        this.state.email,
        "Email format is incorrect."
      ) ||
      this.checkIsEmptyTextWithNameError(this.state.start_date, "Start") ||
      this.checkIsEmptyTextWithNameError(this.state.end_date, "End") ||
      this.checkIsEmptyTextWithNameError(this.state.budget, "Budget")
    ) {
      return;
    }

    var data = {
      person: this.state.email,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      budget: parseInt(this.state.budget)
    };

    this.props.updateFormCallBack("", data, this.state);
  };

  render() {
    return (
      <div style={{ width: "500px" }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.email}
              labelText="Eamil"
              id="email"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "email", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            {this.createCalendarInput("start_date", "Start * (Mandatory)")}
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            {this.createCalendarInput("end_date", "End * (Mandatory)")}
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.budget}
              labelText="Budget"
              id="budget"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                type: "number",
                onChange: e => {
                  this.onChangeHandler(e, "budget", "text");
                }
              }}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

AddPackageDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  AddPackageDialog,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  dialogStyle
);
