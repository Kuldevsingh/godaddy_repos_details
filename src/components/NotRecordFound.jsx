import React from "react";
import PropTypes from "prop-types";

export default function NotRecordFound({ content }) {
  return <div className="text-center">{content}</div>;
}

NotRecordFound.propTypes = {
  content: PropTypes.string,
};
