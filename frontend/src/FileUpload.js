import React from "react";

import { uploadService } from "./utils";
import { history } from "./history";
import "./fileupload.css"

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { storehtmldata } from "./_actions/storehtmldata";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: "",
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  async handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);

    await uploadService.uploadFile(data).then((response) => {
      this.props.storehtmldata(response.data);
      history.push("/edit");
    });
  }

  render() {
    return (
      <form className="form-container" onSubmit={this.handleUploadImage}>
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
          <button>Parse</button>
        </div>
      </form>
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
