import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import api from "../../../../api";
import QualitiesList from "../../../ui/qualities/qualitiesList";
import PropTypes from "prop-types";
import UserEditPage from "../userEditPage";
const UserPage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const location = useLocation().pathname;
  const history = useHistory();
  const handleClick = () => {
    history.push(location + "/edit");
  };

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  if (!user) {
    return <h1>Loading..</h1>;
  }

  const handleSubmit = (value) => {
    setUser(value);
  };

  return (
    <>
      {location === `/users/${userId}/edit`
        ? <UserEditPage data={user} onSubmit={handleSubmit} />
        : (
          <>
            <h1>{user.name}</h1>
            <h2>Profession: {user.profession.name}</h2>
            <QualitiesList qualities={user.qualities} />
            <p>Completed Meetings: {user.completedMeetings}</p>
            <h2>Rate: {user.rate}</h2>
            <button onClick={handleClick}>Изменить</button>
          </>
        )
      }
    </>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
