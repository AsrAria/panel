// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import OrganizationFilter from "views/Organization/OrganizationFilter.jsx";
import OrganizationDialog from "views/Organization/OrganizationDialog.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
// MARK: project imports
import { connectComponent } from "helper/componentHelper.js";

// MARK: component

function OrganizationList(props) {
  return (
    <Pagination
      baseUrl={"/organization"}
      title={"Organizations"}
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
          name: "Confirmed",
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
            value: item.is_confirmed,
            enable: props.admin.hasWritePermission(
              "organization",
              "organization"
            ),
            actionEnable: "confirm",
            actionDisable: "reject"
          }
        ];
      }}
      editType={"page"}
      editDialog={OrganizationDialog}
      filterComponent={OrganizationFilter}
      enableAdd={false}
      enableEdit={props.admin.hasWritePermission(
        "organization",
        "organization"
      )}
      enableDelete={false}
      closeAfterCreate={false}
    />
  );
}

// MARK: prop type validation

OrganizationList.propTypes = {
  admin: PropTypes.object.isRequired
};

// MARK: export

export default connectComponent(OrganizationList, [], function mapStateToProps(
  state
) {
  return {
    app: state.app,
    admin: state.admin
  };
});
