import React, { Component } from 'react';
import { Consumer } from '../../context/context';
import Spinner from '../Layout/Spinner';
import Track from './Track';

export class Tracks extends Component {
  render() {
    console.log(this.props);
    return (
      <Consumer>
        {(value) => {
          const { track_list, heading } = value;
          if (track_list.length < 1) {
            return <Spinner />;
          }
          return (
            <React.Fragment>
              <h3 className="text-center mb-4">{heading}</h3>
              <div className="row">
                {track_list.map((item) => (
                  <Track key={item.track.track_id} track={item.track} />
                ))}
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Tracks;
