import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function Editor({
  submitFunction,
  stateVariables,
  stateFunctions,
  typeOfEdit,
}) {
  const naviagate = useNavigate();
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <form onSubmit={submitFunction}>
      <input
        type="title"
        placeholder="Title"
        value={stateVariables.title}
        onChange={(e) => {
          stateFunctions.setTitle(e.target.value);
        }}
        required={typeOfEdit === "Create Post"}
      />

      <input
        type="summary"
        placeholder="Summary"
        value={stateVariables.summary}
        onChange={(e) => {
          stateFunctions.setSummary(e.target.value);
        }}
        required={typeOfEdit === "Create Post"}
      />
      <input
        type="file"
        onChange={(e) => {
          stateFunctions.setFiles(e.target.files);
        }}
        multiple
      />
      <ReactQuill
        value={stateVariables.content}
        modules={modules}
        onChange={(newValue) => {
          stateFunctions.setContent(newValue);
        }}
      />
      <button style={{ marginTop: "10px" }} type="submit">
        {typeOfEdit}
      </button>
    </form>
  );
}

export default Editor;
