import { SET_TRACKS } from './SearchActions';

export default function (state = [], action) {
  switch (action.type) {
    case SET_TRACKS:
      return action.tracks;
    default:
      return state;
  }
}
