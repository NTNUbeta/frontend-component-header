/* eslint-disable react/default-props-match-prop-types */
import React, { useContext } from "react";
import Responsive from "react-responsive";
import { injectIntl, intlShape } from "@edx/frontend-platform/i18n";
import { AppContext } from "@edx/frontend-platform/react";
import { APP_CONFIG_INITIALIZED, ensureConfig, mergeConfig, getConfig, subscribe } from "@edx/frontend-platform";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import messages from "./Header.messages";
ensureConfig(["LMS_BASE_URL", "LOGOUT_URL", "LOGIN_URL", "SITE_NAME", "LOGO_URL", "ORDER_HISTORY_URL"], "Header component");
subscribe(APP_CONFIG_INITIALIZED, function () {
  mergeConfig({
    AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER
  }, "Header additional config");
});

function Header(_ref) {
  var intl = _ref.intl;

  var _useContext = useContext(AppContext),
      authenticatedUser = _useContext.authenticatedUser,
      config = _useContext.config;

  var mainMenu = [{
    type: "item",
    href: "".concat(config.LMS_BASE_URL, "/dashboard"),
    content: intl.formatMessage(messages["header.links.courses"])
  }, {
    type: "item",
    href: "/",
    active: homeLink,
    content: intl.formatMessage(messages["header.links.home"])
  }, {
    type: "item",
    href: "/search",
    active: searchLink,
    content: intl.formatMessage(messages["header.links.search"])
  }, {
    type: "item",
    href: "/programs",
    active: programsLink,
    content: intl.formatMessage(messages["header.links.programs"])
  }, {
    type: "item",
    href: "/courses",
    active: coursesLink,
    content: intl.formatMessage(messages["header.links.courses"])
  }, {
    type: "item",
    href: "/articles",
    active: articlesLink,
    content: intl.formatMessage(messages["header.links.articles"])
  }, {
    type: "item",
    href: "/about",
    active: aboutLink,
    content: intl.formatMessage(messages["header.links.about"])
  }];
  var userMenu = authenticatedUser === null ? [] : [{
    type: "item",
    href: "/dashboard",
    content: intl.formatMessage(messages["header.user.menu.dashboard"])
  }, {
    type: "item",
    href: "/profile/".concat(authenticatedUser.username),
    content: intl.formatMessage(messages["header.user.menu.profile"])
  }, {
    type: "item",
    href: "".concat(config.LMS_BASE_URL, "/dashboard"),
    hrefType: "external",
    content: intl.formatMessage(messages["header.user.menu.lms.dashboard"])
  }, {
    type: "item",
    href: "".concat(config.LMS_BASE_URL, "/account/settings"),
    hrefType: "external",
    content: intl.formatMessage(messages["header.user.menu.lms.account.settings"])
  }, {
    type: "item",
    href: "".concat(config.LOGOUT_URL, "?next=").concat(encodeURIComponent(config.BASE_URL)),
    hrefType: "external",
    content: intl.formatMessage(messages["header.user.menu.logout"])
  }];
  var loggedOutItems = [{
    type: "item",
    href: config.LOGIN_URL,
    content: intl.formatMessage(messages["header.user.menu.login"])
  }, {
    type: "item",
    href: "".concat(config.LMS_BASE_URL, "/register"),
    content: intl.formatMessage(messages["header.user.menu.register"])
  }];
  var props = {
    logo: config.LOGO_URL,
    logoAltText: config.SITE_NAME,
    logoDestination: "/",
    loggedIn: authenticatedUser !== null,
    username: authenticatedUser !== null ? authenticatedUser.username : null,
    avatar: authenticatedUser !== null ? authenticatedUser.avatar : null,
    mainMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : mainMenu,
    userMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : userMenu,
    loggedOutItems: getConfig().AUTHN_MINIMAL_HEADER ? [] : loggedOutItems,
    siteName: config.SITE_NAME
  };
  Header.defaultProps = {
    homeLink: false,
    coursesLink: false,
    articlesLink: false,
    programsLink: false,
    aboutLink: false
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Responsive, {
    maxWidth: 768
  }, /*#__PURE__*/React.createElement(MobileHeader, props)), /*#__PURE__*/React.createElement(Responsive, {
    minWidth: 769
  }, /*#__PURE__*/React.createElement(DesktopHeader, props)));
}

Header.propTypes = {
  intl: intlShape.isRequired
};
export default injectIntl(Header);
//# sourceMappingURL=Header.js.map