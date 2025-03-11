import React from "react";
import Home from "../Pages/Home";
import { Route, Routes } from "react-router-dom";
import Profile from "../Pages/Profile";
import Feed from "../Pages/Feed";
import Login from "../Pages/Login";
import Protected from "../Components/Protected";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Protected children={<Home />} /> }>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
