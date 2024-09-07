// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
// MARK: project imports
import * as actionCreators from "actions/user.js";
import { downloadFile } from "helper/restHelper.js";
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class PsychiatristDialog extends BaseDialog {
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
      attachment: "",
      birth_date: "",
      address: "",
      post_code: "",
      work_tel: "",
      home_tel: "",
      mobile: "",
      primary_credential: 0,
      primary_specialty: 0,
      applied_before: false,
      last_three_years_experiences: "",
      name_of_posts_of_the_last_3_years: "",
      more_information: "",
      price_1: 0,
      price_2: 0,
      price_3: 0
    };
  };

  createDataState = () => {
    this.data.price_1 = 0;
    if (
      this.data.plans !== null &&
      this.data.plans !== undefined &&
      this.data.plans.length > 1
    ) {
      this.data.price_1 = this.data.plans[0].price;
    }

    this.data.price_2 = 0;
    if (
      this.data.plans !== null &&
      this.data.plans !== undefined &&
      this.data.plans.length >= 2
    ) {
      this.data.price_2 = this.data.plans[1].price;
    }

    this.data.price_3 = 0;
    if (
      this.data.plans !== null &&
      this.data.plans !== undefined &&
      this.data.plans.length >= 3
    ) {
      this.data.price_3 = this.data.plans[2].price;
    }
    return this.data;
  };

  updateData = () => {
    if (
      this.checkIsEmptyTextWithNameError(this.state.first_name, "First Name") ||
      this.checkIsEmptyTextWithNameError(this.state.last_name, "Last Name") ||
      this.checkIsEmptyTextWithNameError(this.state.age, "Age") ||
      this.checkConditionWithError(
        parseInt(this.state.age) < 0,
        "The sex field is less than 1."
      ) ||
      this.checkIsEmptyTextWithNameError(this.state.sex, "Sex") ||
      this.checkIsEmptyTextWithNameError(this.state.birth_date, "Birth Date") ||
      this.checkIsEmptyTextWithNameError(this.state.address, "Address") ||
      this.checkIsEmptyTextWithNameError(this.state.post_code, "Post Code") ||
      this.checkIsEmptyTextWithNameError(this.state.home_tel, "Home Tel") ||
      this.checkIsEmptyTextWithNameError(this.state.mobile, "Mobile") ||
      this.checkIsEmptyTextWithNameError(
        this.state.primary_credential,
        "Primary Credential"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.primary_specialty,
        "Primary Specialty"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.last_three_years_experiences,
        "Last three years experiences"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.name_of_posts_of_the_last_3_years,
        "Name of posts of the last 3 years"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.price_1,
        "The price of a 30-minute session"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.price_2,
        "The price of a 60-minute session"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.price_3,
        "The price of a 90-minute session"
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
      attachment: this.state.attachment,
      birth_date: this.state.birth_date,
      address: this.state.address,
      post_code: this.state.post_code,
      work_tel: this.state.work_tel,
      home_tel: this.state.home_tel,
      mobile: this.state.mobile,
      primary_credential: this.state.primary_credential,
      primary_specialty: this.state.primary_specialty,
      applied_before: this.state.applied_before,
      last_three_years_experiences: this.state.last_three_years_experiences,
      name_of_posts_of_the_last_3_years: this.state
        .name_of_posts_of_the_last_3_years,
      more_information: this.state.more_information,
      plans: [
        {
          price: parseInt(this.state.price_1)
        },
        {
          price: parseInt(this.state.price_2)
        },
        {
          price: parseInt(this.state.price_3)
        }
      ]
    };

    this.props.updateFormCallBack("", data, this.state);
  };

  createProfileTab() {
    const { classes } = this.props;

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
              labelText="Address * (Mandatory)"
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
              labelText="Post Code * (Mandatory)"
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
              labelText="Home Tel * (Mandatory)"
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
              labelText="Mobile * (Mandatory)"
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
              value={this.state.primary_credential}
              labelText="Primary Credential * (Mandatory)"
              id="primary_credential"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "primary_credential");
                }
              }}
              items={[
                "LCSW (Licensed Clinical Social Worker)",
                "LICSW (Licensed Independent Clinical Social Worker)",
                "LMFT (Licensed Mental Health Counselor)",
                "LMHC (Licensed Mental Health Counselor)",
                "LPC (Licensed Professional Counselor)",
                "PHD",
                "PSYD (The Doctorof Psychology)"
              ]}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomSelect
              value={this.state.primary_specialty}
              labelText="Primary Specialty * (Mandatory)"
              id="primary_specialty"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "primary_specialty");
                }
              }}
              items={[
                "Child Psychologist",
                "Counselor",
                "Psychiatrist",
                "Psychologist"
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.horizontal}>
              {this.state.attachment !== "" ? (
                <Button
                  onClick={() => {
                    downloadFile(this.state.attachment, this.state.id + ".zip");
                  }}
                  color="success"
                  className={classes.downloadButton}
                >
                  Download
                </Button>
              ) : null}
              {this.state.attachment !== "" ? (
                <Button
                  onClick={() => {
                    this.onChangeHandler("", "attachment", "raw");
                  }}
                  color="danger"
                  className={classes.downloadButton}
                >
                  Delete
                </Button>
              ) : null}
              <CustomInput
                value={"Zip the desired attachment and then upload."}
                labelText="Select attachment"
                id="type"
                formControlProps={{
                  disabled: true,
                  fullWidth: true
                }}
              />
              <Button
                onClick={() => {
                  this.inputElement.click();
                }}
                color="success"
                className={classes.selectButton}
              >
                Select
              </Button>
              <input
                id="attachment"
                name="attachment"
                type="file"
                accept=".zip"
                className={classes.fileInput}
                ref={input => (this.inputElement = input)}
                onChange={e => {
                  this.setState(() => ({ loadingDialogOpen: true }));
                  this.props.uploadFile(
                    this.state.id,
                    e.target.files[0],
                    "attachment",
                    response => {
                      this.onChangeHandler(response.url, "attachment", "raw");
                      this.setState(() => ({
                        loadingDialogOpen: false
                      }));
                    },
                    () => {
                      this.setState(() => ({
                        loadingDialogOpen: false
                      }));
                    }
                  );
                  e.target.value = null;
                }}
              />
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <div className={this.props.classes.checkItem}>
              <label className={this.props.classes.checkTitle}>
                Applied before *
              </label>
              <Checkbox
                className={this.props.classes.checkBox}
                checked={this.state.applied_before}
                disabled={!this.props.enableEdit}
                onChange={e => {
                  this.onChangeHandler(e, "applied_before", "check");
                }}
                checkedIcon={
                  <Check className={this.props.classes.checkedIcon} />
                }
                icon={<Check className={this.props.classes.uncheckedIcon} />}
              />
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.last_three_years_experiences}
              labelText="Last three years experiences * (Mandatory)"
              id="last_three_years_experiences"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(
                    e,
                    "last_three_years_experiences",
                    "text"
                  );
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.name_of_posts_of_the_last_3_years}
              labelText="Name of posts of the last 3 years * (Mandatory)"
              id="name_of_posts_of_the_last_3_years"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(
                    e,
                    "name_of_posts_of_the_last_3_years",
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
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.price_1}
              labelText="The price of a 30-minute session * (Mandatory)"
              id="price_1"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                type: "number",
                onChange: e => {
                  this.onChangeHandler(e, "price_1", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.price_2}
              labelText="The price of a 60-minute session * (Mandatory)"
              id="price_2"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                type: "number",
                onChange: e => {
                  this.onChangeHandler(e, "price_2", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.price_3}
              labelText="The price of a 90-minute session * (Mandatory)"
              id="price_3"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                type: "number",
                onChange: e => {
                  this.onChangeHandler(e, "price_3", "text");
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

PsychiatristDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  uploadFile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  PsychiatristDialog,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      admin: state.admin
    };
  },
  dialogStyle
);
