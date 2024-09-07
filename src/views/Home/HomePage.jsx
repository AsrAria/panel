// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
// MARK: project imports
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import homePageStyle from "assets/styles/views/homePageStyle.jsx";

// MARK: component

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingDialogOpen: false,
      eventDialogOpen: false
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.mainCard}>
          <CardHeader color="primary">
            <div className={classes.cardTitleWhite}>Home page</div>
          </CardHeader>
          <CardBody className={classes.mainBody}>
            <div className={classes.titleText}>Psykon</div>
            <div className={classes.descriptionText}>
              Psykon application content management system.
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

// MARK: prop type validation

HomePage.propTypes = {
  admin: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  HomePage,
  [],
  function mapStateToProps(state) {
    return {
      admin: state.admin
    };
  },
  homePageStyle
);
