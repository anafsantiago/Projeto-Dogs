import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";

const User = () => {
  return (
    <section className="container">
      <UserHeader/>
      <Outlet />
    </section>
  );
};

export default User;
