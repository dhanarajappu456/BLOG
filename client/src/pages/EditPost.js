import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState();
  const { id: postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/post/" + postId)
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);

        setIsLoading(false);
      })
      .catch((err) => {
        navigate("/error");
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);

    for (let i = 0; i < files?.length; i++) {
      data.append("file", files[i]);
    }

    const response = await fetch(
      process.env.REACT_APP_API_URL + "/editPost/" + postId,
      {
        method: "PUT",
        body: data,
        credentials: "include",
      }
    );

    if (response.ok) {
      navigate("/");
    } else if (response.status === 401) {
      alert("Please login, with right credentials");
    } else {
      navigate("/error");
    }
  }

  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  return (
    <Editor
      submitFunction={handleSubmit}
      stateVariables={{ title, content, summary, files }}
      stateFunctions={{ setTitle, setSummary, setContent, setFiles }}
      typeOfEdit="Edit Post"
    />
  );
}

export default EditPost;
