import React, { useRef } from "react";

function RegisterPage() {
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  return (
    <form
      className="register"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(userNameRef.current.value, passwordRef.current.value);
        console.log(process.env.REACT_APP_API_URL);

        fetch(process.env.REACT_APP_API_URL + "/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userNameRef.current.value,
            password: passwordRef.current.value,
          }),
        })
          .then((resp) => {
            if (resp.status === 200) {
              alert("Success registering");
            } else {
              console.log(resp);
              alert(
                "Oops!! Either the username is already taken / username is empty:("
              );
            }
          })

          .catch((e) => {
            console.log("error", e);
          });
      }}
    >
      <h1>Register</h1>
      <input
        ref={userNameRef}
        type="text"
        pattern="[A-Za-z0-9]+"
        title="Only alphanumeric  characters are allowed"
        placeholder="username"
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="password"
        pattern="[A-Za-z0-9]+"
        title="Only alphanumeric  characters _&$#@ are only allowed"
      />
      <button type="sumbit">Register</button>
    </form>
  );
}

export default RegisterPage;
