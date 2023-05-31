import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const handleClick = () => {
    history.push("/users");
  };

  useEffect(() => {
    api.users.getById(userId)
      .then(data => setUser(data));
  }, []);

  if (!user) {
    return <h1>Loading..</h1>;
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>Profession: {user.profession.name}</h2>
      <QualitiesList qualities={user.qualities} />
      <p>Completed Meetings: {user.completedMeetings}</p>
      <h2>Rate: {user.rate}</h2>
      <button onClick={handleClick}>Все пользователи</button>
    </>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
