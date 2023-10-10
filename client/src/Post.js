import React from "react";

function Post() {
  return (
    <div className="post">
      <div className="image">
        <img src="https://th.bing.com/th/id/OIP.HLuY60jzx5puuKjbqmWRRwHaEK?pid=ImgDet&rs=1"></img>
      </div>

      <div className="content">
        <h2 class="heading">Lorem Ipsum.</h2>
        <p className="info">
          <a className="author">Daan</a>

          <time datetime="P2D">2023-01-01 16:45</time>
        </p>

        <p className="summary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}

export default Post;
