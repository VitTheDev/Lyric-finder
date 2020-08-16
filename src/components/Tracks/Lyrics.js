import React, { Component } from 'react';
import axios from 'axios';
import { api } from '../../context/context';
import Spinner from '../Layout/Spinner';
import { Link } from 'react-router-dom';

export class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  componentDidMount = async () => {
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${api}`
      )
      .then(async (res) => {
        this.setState({
          lyrics: res.data.message.body.lyrics,
        });
        return await axios
          .get(
            `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${api}`
          )
          .then((res) => {
            this.setState({ track: res.data.message.body.track });
          });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { track, lyrics } = this.state;
    if (Object.keys(track).length > 0 && Object.keys(lyrics).length > 0) {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{' '}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID:</strong> {track.album_id}
            </li>
            {track.primary_genres.music_genre_list.length > 0 ? (
              <li className="list-group-item">
                <strong>Genre:</strong>{' '}
                {
                  track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                }
              </li>
            ) : null}
            <li className="list-group-item">
              <strong>Explicit:</strong> {track.explicit ? 'Yes' : 'No'}
            </li>
            <li className="list-group-item">
              <strong>Album Name:</strong> {track.album_name}
            </li>
          </ul>
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default Lyrics;
