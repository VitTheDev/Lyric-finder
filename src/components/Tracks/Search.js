import React, { useState } from 'react';
import axios from 'axios';
import { Consumer, api } from '../../context/context';

const Search = () => {
  const [inputValue, setInputValue] = useState('');

  const findTrack = async (dispatch, e) => {
    e.preventDefault();

    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${inputValue}&page_size=10&page=1&s_track_rating=desc&apikey=${api}`
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list,
        });
      })
      .then(() => {
        setInputValue('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Consumer>
      {(value) => {
        const { dispatch } = value;
        return (
          <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
              <i className="fas fa-music"></i> Search for a song
            </h1>
            <p className="lead text-center">
              Get lyrics for your favourite song
            </p>
            <form
              onSubmit={(e) => findTrack(dispatch, e)}
              className="form-group"
            >
              <input
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="text"
                className="form-control form-control-lg"
                placeholder="Search..."
              />
              <button
                className="btn btn-primary btn-lg btn-block mb-5"
                type="submit"
              >
                Get Track Lyrics
              </button>
            </form>
          </div>
        );
      }}
    </Consumer>
  );
};

export default Search;
