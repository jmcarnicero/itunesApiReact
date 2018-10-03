import axios from 'axios';

export const SET_TRACK_DETAIL = 'SET_TRACK_DETAIL';
const TRACK_DETAIL_ID = 'https://itunes.apple.com/lookup?id=';

export function setTrackDetail(trackDetail) {
  return dispatch => dispatch({
    type: SET_TRACK_DETAIL,
    trackDetail,
  });
}

export function fetchTrackDetail(id) {
  return (dispatch) => {
    const url = `${TRACK_DETAIL_ID}${id}`;
    const request = axios.get(url);
    request
      .then((response) => {
        dispatch(setTrackDetail(response.data.results[0]));
      })
      .catch(() => {
        dispatch(setTrackDetail({ false: true }));
      });
  };
}
