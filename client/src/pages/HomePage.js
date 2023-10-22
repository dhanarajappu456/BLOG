import React, { useEffect, useState } from "react";
import Post from "../components/Post";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/posts")
      .then((response) => {
        response
          .json()
          .then((posts) => {
            setPosts(posts);
            setLoading(false);
          })
          .catch((err) => {});
      })

      .catch((err) => {});
  }, []);

  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading ...</div>;
  }
  return (
    <>
      {/* //put mapping conditon here */}
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post {...post} />;
        })}

      {posts.length == 0 && (
        <div style={{ textAlign: "center" }}>
          Oops , nothing to show here...
        </div>
      )}
    </>
  );
}

export default HomePage;
