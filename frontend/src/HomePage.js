import React from "react";
import FileUpload from "./FileUpload";

import "./homepage.css";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homepage-container">
        <h1>SIMPdf - Simple pdf text editor</h1>
        <p> Double click to edit the text, and save page as PDF</p>
        <FileUpload />
      </div>
    );
  }
}
