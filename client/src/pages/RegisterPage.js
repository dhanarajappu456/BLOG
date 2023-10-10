import React, { useRef } from "react";

function RegisterPage() {
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  return (
    <form className="register">
      <h1>Register</h1>
      <input ref={userNameRef} type="text" placeholder="username" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <button
        onClick={(e) => {
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
                alert("success registering");
              } else {
                console.log(resp);
                alert("oops!! something went wrong , failed registering");
              }
            })

            .catch((e) => {
              console.log("error", e);
            });
        }}
      >
        Register
      </button>
    </form>
  );
}

export default RegisterPage;
