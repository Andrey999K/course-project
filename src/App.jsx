import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./layout/main";
import NavBar from "./components/navBar";
import Login from "./layout/login";
import UsersList from "./components/usersList";

const App = () => {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/login" component={Login}/>
        <Route path="/users/:id?" component={UsersList}/>
      </Switch>
    </>
  );
};

export default App;
