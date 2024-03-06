import React, { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/test")
      .then((resp) => {
        const d = resp.json();
        console.log(d);
        return d;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);
  return <div>Test</div>;
}
