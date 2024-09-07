// MARK: library imports
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { css } from "glamor";
import { BrowserView, MobileView } from "react-device-detect";
// MARK: project imports
import { dashboardTable, dashboardRoutes } from "routes/dashboard.jsx";
import { connectComponentWithStyle } from "helper/componentHelper.js";
// MARK: project ui imports
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import MobileSupportPage from "views/Dashboard/MobileSupportPage.jsx";
import dashboardStyle from "assets/styles/views/dashboardStyle.jsx";
import image from "assets/img/image_sidebar.jpg";
import icon from "assets/img/icon.png";

// MARK: component

const switchRoutes = admin => {
  return (
    <Switch>
      {dashboardRoutes(admin).map((prop, key) => {
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={key} />;
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  );
};

// MARK: component

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false
    };

    this.resizeFunction = this.resizeFunction.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <BrowserView>
          <div>
            <div className={classes.wrapper}>
              <Sidebar
                routes={dashboardTable(this.props.admin)}
                logoText={"Psykon"}
                logo={icon}
                image={image}
                handleDrawerToggle={this.handleDrawerToggle}
                open={this.state.mobileOpen}
                color="blue"
                {...rest}
              />
              <div className={classes.mainPanel} ref="mainPanel">
                <Header
                  routes={dashboardRoutes(this.props.admin)}
                  handleDrawerToggle={this.handleDrawerToggle}
                  {...rest}
                />
                <div className={classes.content}>
                  <div className={classes.container}>
                    {switchRoutes(this.props.admin)}
                  </div>
                </div>
                <Footer />
              </div>
            </div>
            <ToastContainer
              toastClassName={css({
                fontSize: "14px",
                paddingLeft: "15px",
                paddingBottom: "15px"
              })}
            />
          </div>
        </BrowserView>
        <MobileView>
          <MobileSupportPage />
        </MobileView>
      </div>
    );
  }
}

// MARK: prop type validation

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired
};

// MARK: export

export default connectComponentWithStyle(
  Dashboard,
  [],
  function mapStateToProps(state) {
    return {
      admin: state.admin
    };
  },
  dashboardStyle
);
