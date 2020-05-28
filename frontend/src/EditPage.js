import React from "react";

import "./editpage.css";
import renderHTML from "react-render-html";
import { history } from "./history";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  errorPage() {
    return (
      <div>
        Please upload a file{" "}
        <button onClick={() => history.push("/")}>Homepage</button>
      </div>
    );
  }

  renderPdfEditor() {
    return (
      <div>
        <div>{renderHTML(this.props.data.data)}</div>
      </div>
    );
  }

  render() {
    return (
      <div contentEditable="true">
        {this.props.data.data ? this.renderPdfEditor() : this.errorPage()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state;
  return { data };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // Actions go here
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
