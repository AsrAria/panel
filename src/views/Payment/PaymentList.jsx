// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: ui imports
import PaymentFilter from "views/Payment/PaymentFilter.jsx";
import PaymentDialog from "views/Payment/PaymentDialog.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
// MARK: project imports
import { connectComponent } from "helper/componentHelper.js";

// MARK: component

function PaymentList() {
  return (
    <Pagination
      baseUrl={"/payment"}
      title={"Payments"}
      tableSize={[10, 11, 12]}
      tableHead={[
        {
          name: "User",
          size: null
        },
        {
          name: "Amount",
          size: null
        },
        {
          name: "Status",
          size: null
        }
      ]}
      getItemId={item => {
        return item.id;
      }}
      getItemName={item => {
        return item.user.email;
      }}
      getItemRow={item => {
        return [
          {
            type: "text",
            value: item.user.email
          },
          {
            type: "text",
            value: item.amount
          },
          {
            type: "text",
            value: ["In progress", "Success", "Unsuccess"][item.status]
          }
        ];
      }}
      editDialog={PaymentDialog}
      filterComponent={PaymentFilter}
      enableAdd={false}
      enableEdit={false}
      enableDelete={false}
      closeAfterCreate={false}
    />
  );
}

// MARK: prop type validation

PaymentList.propTypes = {
  admin: PropTypes.object.isRequired
};

// MARK: export

export default connectComponent(PaymentList, [], function mapStateToProps(
  state
) {
  return {
    app: state.app,
    admin: state.admin
  };
});
