import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function LoginPage() {
  useEffect(() => {
    console.log("login usefdfexct hello...");
  });
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  function handleUserName(e) {
    setUserName(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          passWord: password,
        }),
        credentials: "include",
      });
      console.log("res", response);
      // const data = await response.json();
      // console.log("data", data);
      if (response.status === 200) {
        response.json().then((userInfoResponse) => {
          console.log("userinfo", userInfoResponse);
          setUserInfo(userInfoResponse);
          navigate("/");
        });
      } else if (response.status === 401) {
        alert("Wrong credentials / User not registered");
      } else if (response.status === 500) {
        alert("Internal ServerError");
      } else {
        throw new Error("Some other error");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  }
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={userName}
        onChange={handleUserName}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handlePassword}
      />
      <button>Login</button>
    </form>
  );
}

export default LoginPage;
