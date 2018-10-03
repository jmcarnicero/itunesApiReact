import { SET_TRACK_DETAIL } from './TrackDetailActions';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_TRACK_DETAIL:
      return action.trackDetail;
    default:
      return state;
  }
}
