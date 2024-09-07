// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
import AddPackageDialog from "views/Package/AddPackageDialog.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import dialogStyle from "assets/styles/views/dialogStyle.jsx";

// MARK: component

class OrganizationDialog extends BaseDialog {
  constructor(props) {
    super(props);

    this.initState();
  }

  createBaseState = () => {
    return {
      tab: 0,
      name: "",
      field_of_activity: "",
      manager_name: "",
      operator_name: "",
      address: "",
      post_code: "",
      work_tel: "",
      work_fax: "",
      purpose_for_taking_the_test: "",
      number_of_staff: 0,
      applied_before: false,
      more_information: ""
    };
  };

  createDataState = () => {
    return this.data;
  };

  updateData = () => {
    if (
      this.checkIsEmptyTextWithNameError(this.state.name, "Name") ||
      this.checkIsEmptyTextWithNameError(
        this.state.field_of_activity,
        "Field of Activity"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.manager_name,
        "Manager Full Name"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.operator_name,
        "Operator Full Name"
      ) ||
      this.checkIsEmptyTextWithNameError(this.state.address, "Address") ||
      this.checkIsEmptyTextWithNameError(this.state.post_code, "Post Code") ||
      this.checkIsEmptyTextWithNameError(this.state.work_tel, "Work Tel") ||
      this.checkIsEmptyTextWithNameError(
        this.state.number_of_staff,
        "Number of staff"
      ) ||
      this.checkIsEmptyTextWithNameError(
        this.state.purpose_for_taking_the_test,
        "Purpose for taking the test"
      )
    ) {
      return;
    }

    var data = {
      name: this.state.name,
      field_of_activity: this.state.field_of_activity,
      manager_name: this.state.manager_name,
      operator_name: this.state.operator_name,
      address: this.state.address,
      post_code: this.state.post_code,
      work_tel: this.state.work_tel,
      work_fax: this.state.work_fax,
      purpose_for_taking_the_test: this.state.purpose_for_taking_the_test,
      number_of_staff: parseInt(this.state.number_of_staff),
      applied_before: this.state.applied_before,
      more_information: this.state.more_information
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
              labelText="Name * (Mandatory)"
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
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.field_of_activity}
              labelText="Field of Activity * (Mandatory)"
              id="field_of_activity"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "field_of_activity", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.manager_name}
              labelText="Manager Full Name * (Mandatory)"
              id="manager_name"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "manager_name", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.operator_name}
              labelText="Operator Full Name * (Mandatory)"
              id="operator_name"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "operator_name", "text");
                }
              }}
            />
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
          <GridItem xs={4} sm={4} md={4}>
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
          <GridItem xs={4} sm={4} md={4}>
            <CustomInput
              defaultValue={this.state.work_tel}
              labelText="Work Tel * (Mandatory)"
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
          <GridItem xs={4} sm={4} md={4}>
            <CustomInput
              defaultValue={this.state.work_fax}
              labelText="Work Fax"
              id="work_fax"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "work_fax", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.number_of_staff}
              labelText="Number of Staff * (Mandatory)"
              id="number_of_staff"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                type: "number",
                onChange: e => {
                  this.onChangeHandler(e, "number_of_staff", "text");
                }
              }}
            />
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
              defaultValue={this.state.purpose_for_taking_the_test}
              labelText="Purpose for taking the test * (Mandatory)"
              id="purpose_for_taking_the_test"
              formControlProps={{
                disabled: !this.props.enableEdit,
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(
                    e,
                    "purpose_for_taking_the_test",
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

  createPackagesTab() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Pagination
            baseUrl={"/organization/" + this.state.id + "/package"}
            title={"Packages"}
            tableSize={[12, 12, 12]}
            tableHead={[
              {
                name: "Person",
                size: null
              },
              {
                name: "Start",
                size: null
              },
              {
                name: "End",
                size: null
              },
              {
                name: "Budget",
                size: null
              },
              {
                name: "Balance",
                size: null
              }
            ]}
            getItemId={item => {
              return item.id;
            }}
            getItemName={() => {
              return "Package";
            }}
            getItemRow={item => {
              return [
                {
                  type: "text",
                  value: item.person.name + " (" + item.person.email + ")"
                },
                {
                  type: "text",
                  value: item.start_date
                },
                {
                  type: "text",
                  value: item.end_date
                },
                {
                  type: "text",
                  value: item.budget
                },
                {
                  type: "text",
                  value: item.balance
                }
              ];
            }}
            addDialog={AddPackageDialog}
            enableAdd={this.props.admin.hasWritePermission(
              "organization",
              "organization"
            )}
            enableEdit={false}
            enableDelete={this.props.admin.hasWritePermission(
              "organization",
              "organization"
            )}
          />
        </GridItem>
      </GridContainer>
    );
  }

  createTabList() {
    var list = [
      {
        name: "Profile",
        component: this.createProfileTab()
      },
      {
        name: "Packages",
        component: this.createPackagesTab()
      }
    ];

    return list;
  }

  render() {
    const { classes } = this.props;
    var tabs = this.createTabList();

    return (
      <div className={classes.main}>
        {this.createSelectDialog(
          () => {
            return "شناسه";
          },
          item => {
            return item.udid;
          },
          "",
          () => {
            return false;
          }
        )}

        <Tabs
          value={this.state.tab}
          onChange={(e, value) => {
            var state = { tab: value };
            this.setState(() => state);
          }}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {tabs.map((prop, key) => {
            return (
              <Tab
                classes={{ root: classes.tab }}
                label={prop.name}
                key={key}
              />
            );
          })}
        </Tabs>

        {tabs.map((prop, key) => {
          return this.state.tab === key ? (
            <div key={key}>{prop.component}</div>
          ) : null;
        })}
      </div>
    );
  }
}

// MARK: prop type validation

OrganizationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  OrganizationDialog,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app,
      admin: state.admin
    };
  },
  dialogStyle
);
