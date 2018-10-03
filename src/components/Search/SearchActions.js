import axios from 'axios';

export const SET_TRACKS = 'SET_TRACKS';
const SEARCH_URL = 'https://itunes.apple.com/search?term=';

export function setTracks(tracks) {
  return dispatch => dispatch({
    type: SET_TRACKS,
    tracks,
  });
}

export function fetchSearch(search) {
  return (dispatch) => {
    const url = `${SEARCH_URL}${search}`;
    const request = axios.get(url);

    request.then((response) => {
      dispatch(setTracks(response.data.results));
    });
  };
}
