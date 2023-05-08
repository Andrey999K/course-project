import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import { orderBy } from "lodash";

const Users = ({ users: allUsers, onDelete, onToggleBookMark }) => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(2);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

  useEffect(() => {
    api.professions.fetchAll()
      .then(data =>
        setProfessions(data)
      );
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = item => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const clearFilter = () => {
    setSelectedProf(undefined);
  };

  const handleSort = (field) => {
    setSortBy(field);
  };

  const filteredUsers = selectedProf
    ? allUsers.filter(user => user.profession._id === selectedProf._id)
    : allUsers;
  const count = filteredUsers.length;
  const sortedUsers = orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  useEffect(() => {
    if (userCrop.length === 0) {
      setCurrentPage(prevState => prevState > 1 ? prevState - 1 : prevState);
    }
  }, [userCrop]);

  return (
    <div className="d-flex">
      {professions &&
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt-4" onClick={clearFilter}>Сбросить</button>
        </div>
      }
      <div className="d-flex flex-column">
        <SearchStatus number={count} />
        {count > 0 && (
          <UsersTable
            users={userCrop}
            onDelete={onDelete}
            onToggleBookMark={onToggleBookMark}
            onSort={handleSort}
            selectedSort={sortBy}
          />
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};

export default Users;