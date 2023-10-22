import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState();
  const navigate = useNavigate();
  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, false] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //     ],
  //     ["link", "image"],
  //     ["clean"],
  //   ],
  // };

  // const formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "indent",
  //   "link",
  //   "image",
  // ];
  async function handleSubmit(e) {
    e.preventDefault();
    //logic or submitting the post to server
    try {
      const data = new FormData();

      if (!content) {
        throw new Error("Quill component empty");
      }

      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);

      for (let i = 0; i < files.length; i++) {
        data.append("file", files[i]);
      }

      //data.set("file", files);

      const response = await fetch(process.env.REACT_APP_API_URL + "/post", {
        method: "POST",

        body: data,
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
      } else if (response.status === 401) {
        alert("Please login...");
      } else {
        navigate("/error");
      }
    } catch (err) {
      alert("Inputs can't be empty / some internal server error");
    }
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="title"
    //     placeholder="Title"
    //     value={title}
    //     onChange={(e) => {
    //       setTitle(e.target.value);
    //     }}
    //   />

    //   <input
    //     type="summary"
    //     placeholder="Summary"
    //     value={summary}
    //     onChange={(e) => {
    //
    //       setSummary(e.target.value);
    //     }}
    //   />
    //   <input
    //     type="file"
    //     onChange={(e) => {
    //

    //       setFiles(e.target.files);
    //     }}
    //     multiple
    //   />
    //   <ReactQuill
    //     value={content}
    //     modules={modules}
    //     onChange={(newValue) => {
    //       setContent(newValue);
    //     }}
    //     required
    //   />
    //   <button style={{ marginTop: "10px" }} type="submit">
    //     Create Post
    //   </button>
    // </form>
    <Editor
      submitFunction={handleSubmit}
      stateVariables={{ title, content, summary, files }}
      stateFunctions={{ setTitle, setSummary, setContent, setFiles }}
      typeOfEdit="Create Post"
    />
  );
}

export default CreatePost;
