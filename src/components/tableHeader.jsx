import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (field) => {
    if (selectedSort.path === field) {
      onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
    } else onSort({ path: field, order: "asc" });
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map(column => (
          <th
            key={column}
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
            scope="col"
            {...{ role: columns[column].path && "button" }}
          >
            {columns[column].name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.shape({
    path: PropTypes.string.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired
  }).isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;