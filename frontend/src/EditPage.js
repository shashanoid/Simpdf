import React from "react";

import "./editpage.css";
import renderHTML from "react-render-html";
import { history } from "./history";
import { EmptyPage } from "./empty404";
import Draggable from "react-draggable"; // The default

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  printPage() {
    var mywindow = window.open("", "PRINT", "height=400,width=600");

    mywindow.document.write(
      document.getElementById("print-edit-container").innerHTML
    );

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  }

  startEditor () {
    const pages = document.querySelectorAll(".pc"),
    editor = new MediumEditor(pages, { toolbar: {
      buttons: ['bold', 'italic', 'underline', 'anchor'],
    }})
  }

  componentDidMount () {
    this.startEditor()
  }

  errorpage() {
    return (
      <div>
        <EmptyPage />
      </div>
    );
  }

  renderPdfEditor() {
    return (
      <div className="page-container">
        {/* <div className="top-nav"></div> */}
        <div id="print-edit-container" className="edit-container">
          {renderHTML(this.props.data.data)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="edit-page-container">
        <div className="navbar">
          <nav class="main-menu">
            <ul>
              {/* <li>
                <a href="http://justinfarrow.com">
                  <i class="fa fa-home fa-2x">
                    <img
                      src="https://img.icons8.com/all/500/text.png"
                      width={25}
                      height={25}
                    />
                  </i>
                  <span class="nav-text">Add Text</span>
                </a>
              </li>
              <li class="has-subnav">
                <a href="#">
                  <i class="fa fa-laptop fa-2x">
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                      width={25}
                      height={25}
                    />
                  </i>
                  <span class="nav-text">Add Image</span>
                </a>
              </li> */}

              <li class="has-subnav" onClick={() => this.printPage()}>
                <a href="#">
                  <i class="fa fa-laptop fa-2x">
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/arrows-vol-1-4/24/download_1-512.png"
                      width={25}
                      height={25}
                    />
                  </i>
                  <span class="nav-text">Save & Download</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* <div contentEditable="true">
          <Draggable
            className="drag-text"
            defaultPosition={{ x: 50, y: 50 }}
            position={null}
            grid={[25, 25]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}
          >
            <div>
              <div className="handle">Drag from here</div>
              <div>This readme is really dragging on...</div>
            </div>
          </Draggable>
        </div> */}

        <div contentEditable="true">
          {this.props.data.data ? this.renderPdfEditor() : this.errorpage()}
        </div>
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
