// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import Divider from "@material-ui/core/Divider";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
import { toast } from "react-toastify";
// MARK: project ui imports
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import BaseDialog from "components/Base/BaseDialog.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import adminDialogStyle from "assets/styles/views/adminDialogStyle.jsx";

// MARK: component

class AdminDialog extends BaseDialog {
  constructor(props) {
    super(props);
    this.initState();
  }

  permission_names = {
    admin: "Admins",
    user: "Users",
    person: "Persons",
    psychiatrist: "Psychiatrist",
    organization: "Organization"
  };

  permissions = [
    {
      name: "admin",
      access_level: 0,
      sub_permissions: []
    },
    {
      name: "user",
      access_level: 0,
      sub_permissions: []
    },
    {
      name: "person",
      access_level: 0,
      sub_permissions: []
    },
    {
      name: "psychiatrist",
      access_level: 0,
      sub_permissions: []
    },
    {
      name: "organization",
      access_level: 0,
      sub_permissions: []
    }
  ];

  accessLevels = ["No access", "View", "Edit"];

  createBaseState = () => {
    var state = {
      name: "",
      email: "",
      username: "",
      password: "",
      retryPassword: "",
      permissions: this.permissions
    };
    return state;
  };

  createDataState = () => {
    var state = {};
    state.name = this.data.name;
    state.email = this.data.email;
    state.username = this.data.username;
    state.permissions = this.loadPermission(this.data.permissions);
    return state;
  };

  loadPermission = inputPermissions => {
    var outputPermissions = JSON.parse(JSON.stringify(this.permissions));

    for (var permission of inputPermissions) {
      for (var i in outputPermissions) {
        if (outputPermissions[i].name === permission.name) {
          outputPermissions[i].access_level = permission.access_level;
          for (var sub_permission of permission.sub_permissions) {
            for (var j in outputPermissions[i].sub_permissions) {
              if (
                outputPermissions[i].sub_permissions[j].name ===
                sub_permission.name
              ) {
                outputPermissions[i].sub_permissions[j].access_level = Math.max(
                  sub_permission.access_level,
                  outputPermissions[i].access_level
                );
              }
            }
          }
        }
      }
    }

    return outputPermissions;
  };

  updateData = () => {
    if (
      this.checkIsEmptyTextWithNameError(this.state.name, "Name") ||
      this.checkIsEmptyTextWithNameError(this.state.email, "Email") ||
      this.checkIsEmptyTextWithNameError(this.state.username, "Username") ||
      this.checkConditionWithError(
        this.state.password !== this.state.retryPassword,
        "The new password and its repetition are not equal."
      ) ||
      this.checkConditionWithError(
        this.isCreateMode() && this.isEmptyString(this.state.password),
        "Password must not be blank."
      )
    ) {
      return;
    }

    var data = {
      name: this.state.name,
      email: this.state.email,
      permissions: this.state.permissions
    };

    if (this.isCreateMode()) {
      data.username = this.state.username;
    }
    if (this.state.password !== "") {
      data.password = this.state.password;
    }

    this.props.updateFormCallBack("", data, this.state);
  };

  setPermission = (permission, sub_permission, access_level) => {
    var state = this.state.permissions;

    if (sub_permission == null) {
      state[permission].access_level = access_level;
      for (var i in state[permission].sub_permissions) {
        state[permission].sub_permissions[i].access_level = Math.max(
          state[permission].sub_permissions[i].access_level,
          state[permission].access_level
        );
      }
    } else {
      if (access_level < state[permission].access_level) {
        toast.error(
          "You cannot select an access level lower than the general level."
        );
        return;
      }
      state[permission].sub_permissions[
        sub_permission
      ].access_level = access_level;
    }

    this.setState(
      {
        permissions: state
      },
      () => {
        this.updateData();
      }
    );
  };

  changePermissionVisibility = permission => {
    var state = this.state;
    state["permission_" + permission + "_open"] = !state[
      "permission_" + permission + "_open"
    ];
    this.setState({
      state
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        {this.createSelectDialog(
          () => {
            return "ID";
          },
          item => {
            return item.udid;
          }
        )}
        <GridContainer>
          <GridItem xs={6} sm={6} md={6}>
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
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              defaultValue={this.state.username}
              labelText="Username"
              id="username"
              formControlProps={{
                disabled: !this.isCreateMode(),
                fullWidth: true
              }}
              inputProps={{
                onChange: e => {
                  this.onChangeHandler(e, "username", "text");
                }
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              defaultValue={this.state.email}
              labelText="Email"
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
          {this.props.enableEdit ? (
            <GridItem xs={6} sm={6} md={6}>
              <CustomInput
                defaultValue={this.state.password}
                labelText="Password"
                id="password"
                formControlProps={{
                  disabled: !this.props.enableEdit,
                  fullWidth: true
                }}
                inputProps={{
                  onChange: e => {
                    this.onChangeHandler(e, "password", "text");
                  },
                  type: "password"
                }}
              />
            </GridItem>
          ) : null}
          {this.props.enableEdit ? (
            <GridItem xs={6} sm={6} md={6}>
              <CustomInput
                defaultValue={this.state.retryPassword}
                labelText="Password"
                id="retryPassword"
                formControlProps={{
                  disabled: !this.props.enableEdit,
                  fullWidth: true
                }}
                inputProps={{
                  onChange: e => {
                    this.onChangeHandler(e, "retryPassword", "text");
                  },
                  type: "password"
                }}
              />
            </GridItem>
          ) : null}
        </GridContainer>
        <Divider className={classes.divider} />
        <GridContainer>
          {this.state.permissions.map((prop, key) => {
            return (
              <GridItem xs={6} sm={6} md={6} key={key}>
                <GridContainer>
                  <GridItem xs={8} sm={8} md={8}>
                    <CustomSelect
                      value={prop.access_level}
                      labelText={this.permission_names[prop.name] + " access"}
                      id={"permission_" + prop.name}
                      formControlProps={{
                        disabled: !this.props.enableEdit,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: e => {
                          this.setPermission(key, null, e.target.value);
                        }
                      }}
                      items={this.accessLevels}
                    />
                  </GridItem>
                  {prop.sub_permissions.length > 0 ? (
                    <GridItem xs={4} sm={4} md={4}>
                      <Button
                        onClick={() => {
                          this.changePermissionVisibility(key);
                        }}
                        color="warning"
                        className={this.props.classes.permissionButton}
                      >
                        {!this.state["permission_" + key + "_open"]
                          ? "More accesses"
                          : "Less accesses"}
                      </Button>
                    </GridItem>
                  ) : null}
                  {this.state["permission_" + key + "_open"]
                    ? prop.sub_permissions.map((prop2, key2) => {
                        return (
                          <GridItem xs={6} sm={6} md={6} key={key2}>
                            <CustomSelect
                              value={prop2.access_level}
                              labelText={
                                this.permission_names[prop2.name] + " access"
                              }
                              id={"permission_" + prop.name + "_" + prop2.name}
                              formControlProps={{
                                disabled: !this.props.enableEdit,
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: e => {
                                  this.setPermission(key, key2, e.target.value);
                                }
                              }}
                              items={this.accessLevels}
                            />
                          </GridItem>
                        );
                      })
                    : null}
                </GridContainer>
                <Divider className={classes.divider} />
              </GridItem>
            );
          })}
        </GridContainer>
      </div>
    );
  }
}

// MARK: prop type validation

AdminDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  updateFormCallBack: PropTypes.func.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  AdminDialog,
  [],
  function mapStateToProps(state) {
    return {
      app: state.app
    };
  },
  adminDialogStyle
);
