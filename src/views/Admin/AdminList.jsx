// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: project imports
import * as actionCreators from "actions/admin.js";
import { connectComponent } from "helper/componentHelper.js";
// MARK: project ui imports
import BaseFilter from "components/Base/BaseFilter.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
import AdminDialog from "views/Admin/AdminDialog.jsx";

// MARK: component

function AdminList(props) {
  return (
    <Pagination
      baseUrl={"/admin"}
      title={"Admins"}
      tableSize={[12, 12, 12]}
      tableHead={[
        {
          name: "Name",
          size: null
        },
        {
          name: "Username",
          size: null
        },
        {
          name: "Email",
          size: null
        }
      ]}
      getItemId={item => {
        return item.username;
      }}
      getItemName={item => {
        return item.name;
      }}
      getItemRow={item => {
        return [
          {
            type: "text",
            value: item.name
          },
          {
            type: "text",
            value: item.username
          },
          {
            type: "text",
            value: item.email
          }
        ];
      }}
      editDialog={AdminDialog}
      saveCallBack={(id, data) => {
        if (id === props.admin.username) {
          props.savePermissions(data.permissions);
        }
      }}
      filterComponent={BaseFilter}
      enableAdd={props.admin.hasWritePermission("admin")}
      enableEdit={props.admin.hasWritePermission("admin")}
      enableDelete={props.admin.hasWritePermission("admin")}
    />
  );
}

// MARK: prop type validation

AdminList.defaultProps = {
  savePermissions: () => {}
};

AdminList.propTypes = {
  admin: PropTypes.object.isRequired,
  savePermissions: PropTypes.func.isRequired
};

// MARK: export

export default connectComponent(
  AdminList,
  actionCreators,
  function mapStateToProps(state) {
    return {
      app: state.app,
      admin: state.admin
    };
  }
);
