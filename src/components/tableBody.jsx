import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { Link } from "react-router-dom";

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") return columns[column].component(item);
      return component;
    }
    if (column === "name") {
      return <Link to={`/users/${item._id}`}>{get(item, columns[column].path)}</Link>;
    }
    return get(item, columns[column].path);
  };
  return (
    <tbody>
      {data.map(item =>
        <tr key={item._id}>
          {Object.keys(columns).map(column =>
            <td key={column}>
              {renderContent(item, column)}
            </td>
          )}
        </tr>
      )}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableBody;
