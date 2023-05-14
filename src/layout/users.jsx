import React, { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import GroupList from "../components/groupList";
import api from "../api";
import SearchStatus from "../components/searchStatus";
import UsersTable from "../components/usersTable";
import { orderBy } from "lodash";

const Users = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(2);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [users, setUsers] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  let userCrop = [];

  useEffect(() => {
    api.users.fetchAll()
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    api.professions.fetchAll()
      .then(data =>
        setProfessions(data)
      );
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  useEffect(() => {
    if (userCrop.length === 0) {
      setCurrentPage(prevState => prevState > 1 ? prevState - 1 : prevState);
    }
  }, [userCrop]);

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

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(user => user.profession._id === selectedProf._id)
      : users;
    const count = filteredUsers.length;
    const sortedUsers = orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    userCrop = paginate(sortedUsers, currentPage, pageSize);
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
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
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
  }
  return "loading...";
};

export default Users;
