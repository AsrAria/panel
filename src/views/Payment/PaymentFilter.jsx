// MARK: library imports
import React from "react";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import { BaseFilterClass } from "components/Base/BaseFilter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import baseFilterStyle from "assets/styles/components/baseFilterStyle.jsx";

// MARK: component

class PaymentFilter extends BaseFilterClass {
  // MARK: render

  render() {
    return (
      <div>
        {this.createSelectDialog()}
        <GridContainer>
          {this.createTextFilter("email", "Email", 5)}
          {this.createSelectFilter(
            "status",
            "Status",
            [
              {
                name: "In progress",
                key: "0"
              },
              {
                name: "Success",
                key: "1"
              },
              {
                name: "Unsuccess",
                key: "2"
              }
            ],
            5
          )}
          {this.createFilterButton()}
        </GridContainer>
      </div>
    );
  }
}

// MARK: export

export default connectComponentWithStyle(
  PaymentFilter,
  [],
  function mapStateToProps() {
    return {};
  },
  baseFilterStyle
);
