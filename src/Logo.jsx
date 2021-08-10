/* eslint-disable quotes */
import React from "react";
import PropTypes from "prop-types";
import logo from "./logo.png";

function Logo({ src, alt, ...attributes }) {
  return <img src={logo} alt={alt} {...attributes} />;
}

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

function LinkedLogo({ href, src, alt, ...attributes }) {
  return (
    <a href={href} {...attributes}>
      <img className="d-block" src={logo} alt={alt} />
    </a>
  );
}

LinkedLogo.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export { LinkedLogo, Logo };
export default Logo;
