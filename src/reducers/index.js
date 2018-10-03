import { combineReducers } from 'redux';
import SearchReducer from '../components/Search/SearchReducer';
import TrackDetailReducer from '../components/TrackDetail/TrackDetailReducer';

const rootReducer = combineReducers({
  tracks: SearchReducer,
  trackDetail: TrackDetailReducer,
});

export default rootReducer;
