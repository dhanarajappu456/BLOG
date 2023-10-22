import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContext";
function SinglePost() {
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useContext(UserContext);

  //returns the object where key is the parameter name given when setup
  // the route for this page, here id
  const { id: postId } = useParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/post/" + postId)
      .then((response) => response.json())
      .then((postInfo) => {
        setPostInfo(postInfo);
        setIsLoading(false);
      })
      .catch((err) => {
        navigate("/error");
      });
  }, []);

  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  //
  return (
    <div className="single-post">
      <h2 className="title">{postInfo.title}</h2>

      <time dateTime="P2D">{format(new Date(), "MMM d, yyyy / HH:MM")} </time>
      <div className="singlepost__author">By @{postInfo.author.username}</div>

      {userInfo?.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-button" to={"/edit/" + postId}>
            {" "}
            <svg
              width="48"
              height="48"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit post
          </Link>{" "}
        </div>
      )}

      <div className="image">
        <img src={process.env.REACT_APP_API_URL + "/" + postInfo.cover} />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      ></div>
    </div>
  );
}

export default SinglePost;
