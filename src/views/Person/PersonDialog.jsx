// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: project imports
import * as actionCreators from "actions/user.js";
import { downloadFile } from "helper/restHelper.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class PersonDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    downloadFile(this.data["photo"], "image", true, content => {
      this.onChangeHandler(content, "photo_uri", "raw");
    });

    return {
      first_name: "",
      last_name: "",
      age: 1,
      sex: 0,
      photo: "",
      birth_date: "",
      address: "",
      post_code: "",
      work_tel: "",
      home_tel: "",
      mobile: "",
      duration_of_hospitalization: 0,
      illness_severity: "",
      disease_background: "",
      family_disease_background: "",
      history_of_drug_use: "",
      family_history_of_drug_use: "",
      birth_order: 1,
      number_of_children_in_family: 1,
      more_information: ""
    };
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {
    if (
      this.checkIsEmptyTextWithNameError(this.state.first_name, "First Name") ||
      this.checkIsEmptyTextWithNameError(this.state.last_name, "Last Name") ||
      this.checkIsEmptyTextWithNameError(this.state.age, "Age") ||
      this.checkIsEmptyTextWithNameError(this.state.sex, "Sex") ||
      this.checkConditionWithError(
        parseInt(this.state.age) < 0,
        "The sex field is less than 1."
      ) ||
      this.checkIsEmptyTextWithNameError(this.state.birth_date, "Birth Date") ||
      this.checkIsEmptyTextWithNameError(
        this.state.duration_of_hospitalization,
        "Duration of Hospitalization"
      ) ||
      this.checkConditionWithError(
        parseInt(this.state.birth_order) < 0,
        "The birth order field is less than 1."
      ) ||
      this.checkConditionWithError(
        parseInt(this.state.number_of_children_in_family) < 0,
        "The number of children in family field is less than 1."
      )
    ) {
      return;
    }

    var data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      age: parseInt(this.state.age),
      sex: this.state.sex,
      photo: this.state.photo,
      birth_date: this.state.birth_date,
      address: this.state.address,
      post_code: this.state.post_code,
      work_tel: this.state.work_tel,
      home_tel: this.state.home_tel,
      mobile: this.state.mobile,
      duration_of_hospitalization: this.state.duration_of_hospitalization,
      illness_severity: this.state.illness_severity,
      disease_background: this.state.disease_background,
      family_disease_background: this.state.family_disease_background,
      history_of_drug_use: this.state.history_of_drug_use,
      family_history_of_drug_use: this.state.family_history_of_drug_use,
      more_information: this.state.more_information
    };

    if (this.state.birth_order != null && this.state.birth_order !== "") {
      data.birth_order = parseInt(this.state.birth_order);
    }

    if (
      this.state.number_of_children_in_family != null &&
      this.state.number_of_children_in_family !== ""
    ) {
      data.number_of_children_in_family = parseInt(
        this.state.number_of_children_in_family
      );
    }

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
          <GridItem xs={8} sm={8} md={9}>
            <GridContainer>
              <GridItem xs={6} sm={6} md={6}>
                <CustomInput
                  defaultValue={this.state.first_name}
                  labelText="First Name * (Mandatory)"
                  id="first_name"
                  formControlProps={{
                    disabled: !this.props.enableEdit,
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => {
                      this.onChangeHandler(e, "first_name", "text");
                    }
                  }}
                />
              </GridItem>
              <GridItem xs={6} sm={6} md={6}>
                <CustomInput
                  defaultValue={this.state.last_name}
                  labelText="Last Name * (Mandatory)"
                  id="last_name"
                  formControlProps={{
                    disabled: !this.props.enableEdit,
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => {
                      this.onChangeHandler(e, "last_name", "text");
                    }
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  defaultValue={this.state.age}
                  labelText="Age * (Mandatory)"
                  id="age"
                  formControlProps={{
                    disabled: !this.props.enableEdit,
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "number",
                    onChange: e => {
                      this.onChangeHandler(e, "age", "text");
                    }
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomSelect
                  value={this.state.sex}
                  labelText="Sex * (Mandatory)"
                  id="sex"
                  formControlProps={{
                    disabled: !this.props.enableEdit,
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => {
                      this.onChangeHandler(e, "sex");
                    }
                  }}
                  items={["Male", "Female", "Other"]}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                {this.createCalendarInput(
                  "birth_date",
                  "Birth Date * (Mandatory)"
                )}
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={4} sm={4} md={3}>
            <p className={this.props.classes.imageTitle}>Photo</p>
            {this.createImageInput("photo")}
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.address}
              labelText="Address"
              id="address"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                rows: 3,
                onChange: e => {
                  this.onChangeHandler(e, "address", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.post_code}
              labelText="Post Code"
              id="post_code"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "post_code", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.work_tel}
              labelText="Work Tel"
              id="work_tel"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "work_tel", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.home_tel}
              labelText="Home Tel"
              id="home_tel"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "home_tel", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.mobile}
              labelText="Mobile"
              id="mobile"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "mobile", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomSelect
              value={this.state.duration_of_hospitalization}
              labelText="Duration of Hospitalization * (Mandatory)"
              id="duration_of_hospitalization"
              formControlProps={{
                disabled: false,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "duration_of_hospitalization");
                }
              }}
              items={[
                "OutPatient",
                "Less than 1 Week",
                "1-4 Weeks",
                "More then 4 Weeks",
                "None",
                "Unknown"
              ]}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.illness_severity}
              labelText="Illness Severity"
              id="illness_severity"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "illness_severity", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.disease_background}
              labelText="Disease Background"
              id="disease_background"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "disease_background", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.family_disease_background}
              labelText="Family's Disease Background"
              id="family_disease_background"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "family_disease_background", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.history_of_drug_use}
              labelText="History of Genetic problem, Mental problem or any Medication"
              id="history_of_drug_use"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "history_of_drug_use", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.family_history_of_drug_use}
              labelText="Family's History of Genetic problem, Mental problem or any Medication"
              id="family_history_of_drug_use"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "family_history_of_drug_use", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.birth_order}
              labelText="Birth Order"
              id="birth_order"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                type: "number",
                onChange: e => {
                  this.onChangeHandler(e, "birth_order", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.number_of_children_in_family}
              labelText="Number of Children in Family"
              id="number_of_children_in_family"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                type: "number",
                onChange: e => {
                  this.onChangeHandler(
                    e,
                    "number_of_children_in_family",
                    "text"
                  );
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.more_information}
              labelText="More Information"
              id="more_information"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                rows: 5,
                onChange: e => {
                  this.onChangeHandler(e, "more_information", "text");
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

PersonDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  uploadImage: PropTypes.func.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  PersonDialog,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      admin: state.admin
    };
  },
  dialogStyle
);
