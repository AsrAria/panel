// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import UserFilter from "views/User/UserFilter.jsx";
import UserDialog from "views/User/UserDialog.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
// MARK: project imports
import { connectComponent } from "helper/componentHelper.js";

// MARK: component

function UserList(props) {
  return (
    <Pagination
      baseUrl={"/user"}
      title={"Users"}
      tableSize={[10, 11, 12]}
      tableHead={[
        {
          name: "Name",
          size: null
        },
        {
          name: "Email",
          size: null
        },
        {
          name: "Active",
          size: "45px"
        }
      ]}
      getItemId={item => {
        return item.id;
      }}
      getItemName={item => {
        return item.email;
      }}
      getItemRow={item => {
        return [
          {
            type: "text",
            value: item.name
          },
          {
            type: "text",
            value: item.email
          },
          {
            type: "check",
            value: item.is_enable,
            enable: props.admin.hasWritePermission("user", "user"),
            actionEnable: "enable",
            actionDisable: "disable"
          }
        ];
      }}
      editDialog={UserDialog}
      filterComponent={UserFilter}
      enableAdd={false}
      enableEdit={false}
      enableDelete={false}
      closeAfterCreate={false}
    />
  );
}

// MARK: prop type validation

UserList.propTypes = {
  admin: PropTypes.object.isRequired
};

// MARK: export

export default connectComponent(UserList, [], function mapStateToProps(state) {
  return {
    app: state.app,
    admin: state.admin
  };
});
