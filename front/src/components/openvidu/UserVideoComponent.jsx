/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <div className="h-[100%]">
        {this.props.streamManager !== undefined ? (
          <div className="border-4 border-black h-[100%]">
            <OpenViduVideoComponent
              streamManager={this.props.streamManager}
              className=""
            />
            <div className="absolute top-0 z-10 bg-red-200 pl-3">
              <p>{this.getNicknameTag()}</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
