import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/common/page/userPage";
import UsersListPage from "../components/common/page/usersListPage";

const Users = () => {
  const { userId } = useParams();
  return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
};

export default Users;
