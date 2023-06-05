import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ name, value: !value });
  };
  const getInputClasses = () => {
    return "form-check-label" + (error ? " is-invalid" : "");
  };
  return (
    <div className="form-check mb-4">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
        onChange={handleChange}
        checked={value}
      />
      <label className={getInputClasses()} htmlFor="flexCheckDefault">
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  error: PropTypes.string
};

export default CheckBoxField;
