import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (field) => {
    if (selectedSort.path === field) {
      onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
    } else onSort({ path: field, order: "asc" });
  };
  const showSort = (field) => {
    if (selectedSort.path === field.path) {
      const isAsc = selectedSort.order === "asc";
      return <i className={`bi bi-caret-${isAsc ? "up" : "down"}-fill`} />;
    }
    return false;
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
            <span>{columns[column].name}</span>
            {showSort(columns[column])}
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
