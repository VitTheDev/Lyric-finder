import React, { Component } from 'react';
import axios from 'axios';

export const api = '92a78d9e75d81bac6ef9b5894d36deba';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results',
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };

  componentDidMount = async () => {
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&countru=uk&f_has_lyrics=1&apikey=${api}`
      )
      .then((res) => {
        this.setState({
          track_list: res.data.message.body.track_list,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
