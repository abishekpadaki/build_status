import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import IFrame from "./components/iframe/index";
import "./styles.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      buildStatus: false,
      url: false,
      buildnumber: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("BuildNumber", data => this.setState({ buildnumber: data }));
    socket.on("BuildStatus", data => this.setState({ buildStatus: data }));
    socket.on("URL", data => this.setState({ url: data }));
  }

  render() {
    const { buildStatus } = this.state;
    const { url } = this.state;
    const { buildnumber } = this.state;
    let txtcol;
    if (this.state.buildStatus == "Running") {
      txtcol = "yellow";
    }
    if (this.state.buildStatus == "Failed") {
      txtcol = "red";
    }
    if (this.state.buildStatus == "Successful") {
      txtcol = "green";
    }

    return (
      <>
        <div style={{ textAlign: "center" }}>
          {buildStatus ? (
            <>
              <div class="container buildstats">
                <b>Build Number: </b>
                {buildnumber}
                <br />
                <b>Build Status: </b>
                <span className={`status-${txtcol}`}>{buildStatus}</span>
              </div>
              <div className="customcard">
                {url ? <IFrame link={url} /> : <></>}
              </div>
            </>
          ) : (
            <div>
              <span>
               {/* <img className="img-fluid load" src="loading3.gif" />{" "}
                <h3>LOADING...</h3>  */}
                <h3>No Build Running</h3>
              </span>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default App;
