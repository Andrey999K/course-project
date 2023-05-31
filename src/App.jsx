import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layout/main";
import NavBar from "./components/navBar";
import Login from "./layout/login";
import Users from "./layout/users";

const App = () => {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/login" component={Login}/>
        <Route path="/users/:userId?" component={Users}/>
        <Redirect to="/"/>
      </Switch>
    </>
  );
};

export default App;
