import React, { useContext, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function RegisterPage() {
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  return (
    <form
      className="register"
      onSubmit={(e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + "/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userNameRef.current.value,
            password: passwordRef.current.value,
          }),
          credentials: "include",
        })
          .then((resp) => {
            if (resp.status === 200) {
              alert("Success registering");
              resp.json().then((userinfo) => {
                setUserInfo(userinfo);
                navigate("/");
              });
            } else {
              alert(
                "Oops!! Either the username is already taken / username is empty:("
              );
            }
          })

          .catch((e) => {});
      }}
    >
      <h1>Register</h1>
      <input
        ref={userNameRef}
        type="text"
        minLength="1"
        maxLength="10"
        pattern="^[A-Za-z]+[_A-Za-z0-9]*$"
        title="Only alphbets followed by numbers or _ are allowed"
        placeholder="username"
        required
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="password"
        pattern="[A-Za-z0-9]{1,}"
        title="Only alphanumeric  characters _&$#@ are only allowed"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
