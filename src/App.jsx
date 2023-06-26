import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layout/main";
import NavBar from "./components/ui/navBar";
import Login from "./layout/login";
import Users from "./layout/users";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
