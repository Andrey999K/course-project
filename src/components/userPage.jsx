import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  const goToList = () => {
    history.push("/users");
  };

  useEffect(() => {
    api.users.getById(id)
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
      <div>Completed Meetings: {user.completedMeetings}</div>
      <h2>Rate: {user.rate}</h2>
      <button onClick={goToList}>Все пользователи</button>
    </>
  );
};

export default UserPage;
