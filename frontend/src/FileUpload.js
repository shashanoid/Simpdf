import React from "react";

import { uploadService } from "./utils";
import { history } from "./history";
import "./fileupload.css";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { storehtmldata } from "./_actions/storehtmldata";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: "",
      isLoading: false,
    };

    this.handleUpload = this.handleUpload.bind(this);
  }

  async handleUpload(ev) {
    this.setState({ isLoading: true });
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);

    await uploadService.uploadFile(data).then((response) => {
      this.props.storehtmldata(response.data);
      history.push("/edit");
      this.setState({ isLoading: false });
    });
  }

  renderLoader() {
    return (
      <div>
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    );
  }

  renderFileUpload() {
    return (
      <form className="form-container" onSubmit={this.handleUpload}>
        <div>
          <input
            ref={(ref) => {
              this.uploadInput = ref;
            }}
            type="file"
          />
        </div>
        <br />
        <div>
          <button className="parse-container">Parse</button>
        </div>
      </form>
    );
  }

  render() {
    let { isLoading } = this.state;
    return (
      <div class="spinner">
        {isLoading ? this.renderLoader() : this.renderFileUpload()}
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
      storehtmldata,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
