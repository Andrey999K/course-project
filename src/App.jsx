import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll()
      .then(data => setUsers(data));
  }, []);

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

  return (
    <div>
      {
        users && (
          <Users
            users={users}
            onDelete={handleDelete}
            onToggleBookMark={handleToggleBookMark}
          />
        )
      }
    </div>
  );
};

export default App;
