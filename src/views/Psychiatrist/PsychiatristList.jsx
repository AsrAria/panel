// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import PsychiatristFilter from "views/Psychiatrist/PsychiatristFilter.jsx";
import PsychiatristDialog from "views/Psychiatrist/PsychiatristDialog.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
// MARK: project imports
import { connectComponent } from "helper/componentHelper.js";

// MARK: component

function PsychiatristList(props) {
  return (
    <Pagination
      baseUrl={"/psychiatrist"}
      title={"Psychiatrists"}
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
              "psychiatrist",
              "psychiatrist"
            ),
            actionEnable: "confirm",
            actionDisable: "reject"
          }
        ];
      }}
      editType={"page"}
      editDialog={PsychiatristDialog}
      filterComponent={PsychiatristFilter}
      enableAdd={false}
      enableEdit={props.admin.hasWritePermission(
        "psychiatrist",
        "psychiatrist"
      )}
      enableDelete={false}
      closeAfterCreate={false}
    />
  );
}

// MARK: prop type validation

PsychiatristList.propTypes = {
  admin: PropTypes.object.isRequired
};

// MARK: export

export default connectComponent(PsychiatristList, [], function mapStateToProps(
  state
) {
  return {
    app: state.app,
    admin: state.admin
  };
});
