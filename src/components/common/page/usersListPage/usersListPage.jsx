import React, { useEffect, useState } from "react";
import Pagination from "../../pagination";
import { paginate } from "../../../../utils/paginate";
import GroupList from "../../groupList";
import api from "../../../../api";
import SearchStatus from "../../../ui/searchStatus";
import UsersTable from "../../../ui/usersTable";
import { orderBy } from "lodash";
import Search from "../../search";

const UsersListPage = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(2);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [users, setUsers] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  let userCrop = [];

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  useEffect(() => {
    if (userCrop.length === 0) {
      setCurrentPage((prevState) =>
        prevState > 1 ? prevState - 1 : prevState
      );
    }
  }, [userCrop]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    if (searchQuery !== "") setSearchQuery("");
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

  const handleSearchQuery = (value) => {
    setSearchQuery(value);
    clearFilter();
  };

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter(
        (user) => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      )
      : selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;
    // const searchRegExp = new RegExp(searchQuery, "g");
    // const searchUsers = filteredUsers.filter(user => searchRegExp.test(user.name));
    // console.log(searchUsers);
    const count = filteredUsers.length;
    const sortedUsers = orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    userCrop = paginate(sortedUsers, currentPage, pageSize);
    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary mt-4" onClick={clearFilter}>
              Сбросить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus number={count} />
          <Search
            value={searchQuery}
            onChange={(event) => handleSearchQuery(event.target.value)}
          />
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

export default UsersListPage;
