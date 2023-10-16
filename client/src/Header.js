import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useContext(UserContext);

  //console.log("the context coming to header", userName, setUserName);
  console.log("hello from header", userInfo);
  const userName = userInfo?.userName;
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/profile", {
      credentials: "include",
    })
      .then((resp) => {
        console.log("fdfsfd", typeof resp, resp);
        return resp.json();
      })
      .then((userInfo) => {
        console.log("username, header", userName);
        setUserInfo(userInfo);
      })
      .catch((err) => {
        navigate("/error");
        console.log("error", err);
      });
    console.log("header use effect");
  }, []);

  function handleLogout() {
    //remove userinfo from context and also remove the cookie from the cookie storage
    setUserInfo(null);
    fetch(process.env.REACT_APP_API_URL + "/logout", {
      method: "GET",
      credentials: "include",
    });
  }

  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>

      <nav>
        {userName && (
          <>
            Welcome {userName},<Link to="/createPost"> Create Post </Link>
            <Link onClick={handleLogout}> Logout </Link>
          </>
        )}

        {!userName && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
