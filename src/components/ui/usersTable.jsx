import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";

const UsersTable = ({
  users,
  onDelete,
  onToggleBookMark,
  onSort,
  selectedSort,
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />,
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          onClick={() => onToggleBookMark(user._id)}
          status={user.bookmark}
        />
      ),
    },
    delete: {
      component: (user) => (
        <button
          onClick={() => onDelete(user._id)}
          type="button"
          className="btn btn-danger"
        >
          delete
        </button>
      ),
    },
  };
  return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.shape({
    path: PropTypes.string.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  }).isRequired,
};

export default UsersTable;
