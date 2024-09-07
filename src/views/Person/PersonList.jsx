// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import PersonFilter from "views/Person/PersonFilter.jsx";
import PersonDialog from "views/Person/PersonDialog.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
// MARK: project imports
import { connectComponent } from "helper/componentHelper.js";

// MARK: component

function PersonList(props) {
  return (
    <Pagination
      baseUrl={"/person"}
      title={"Persons"}
      tableSize={[10, 11, 12]}
      tableHead={[
        {
          name: "Name",
          size: null
        },
        {
          name: "Email",
          size: null
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
          }
        ];
      }}
      editType={"page"}
      editDialog={PersonDialog}
      filterComponent={PersonFilter}
      enableAdd={false}
      enableEdit={props.admin.hasWritePermission("person", "person")}
      enableDelete={false}
      closeAfterCreate={false}
    />
  );
}

// MARK: prop type validation

PersonList.propTypes = {
  admin: PropTypes.object.isRequired
};

// MARK: export

export default connectComponent(PersonList, [], function mapStateToProps(
  state
) {
  return {
    app: state.app,
    admin: state.admin
  };
});
