import React, { useEffect, useRef } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
function Post({ _id, author, title, summary, content, cover, createdAt }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={process.env.REACT_APP_API_URL + "/" + cover} />
        </Link>
      </div>
      <div className="content">
        <Link to={`/post/${_id}`}>
          <h2 class="heading">{title} </h2>
        </Link>

        <p className="info">
          <a className="author">{author.username}</a>

          <time datetime="P2D">
            {format(new Date(createdAt), "MMM d,yyyy HH:mm")}
          </time>
        </p>

        <h5 className="summary">{summary} </h5>
        <p
          className="post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
      </div>
    </div>
  );
}

export default Post;
