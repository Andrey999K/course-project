import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ number }) => {
  const renderPhrase = (length) => {
    if (!length) return "Никто с тобой не тусанёт";
    return `${length} ${
      length > 1 && length < 5 ? "человека тусанут" : "человек тусанёт"
    } с тобой сегодня`;
  };

  return (
    <h1>
      <span className={"badge bg-" + (number > 0 ? "primary" : "danger")}>
        {renderPhrase(number)}
      </span>
    </h1>
  );
};

SearchStatus.propTypes = {
  number: PropTypes.number.isRequired
};

export default SearchStatus;
