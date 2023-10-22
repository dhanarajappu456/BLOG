import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Header() {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useContext(UserContext);

  const userName = userInfo?.userName;
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/profile", {
      credentials: "include",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
      })
      .catch((err) => {
        navigate("/error");
      });
  }, []);

  function handleLogout() {
    //remove userinfo from context and also remove the cookie from the cookie storage
    setUserInfo(null);
    localStorage.removeItem("userInfo");
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
            Welcome {userName},<Link to="/create"> Create Post </Link>
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
