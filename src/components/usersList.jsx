import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "./userPage";
import Users from "../layout/users";

const UsersList = () => {
  const { id } = useParams();
  return (
    <>
      {id ? <UserPage/> : <Users/>}
    </>
  );
};

export default UsersList;
