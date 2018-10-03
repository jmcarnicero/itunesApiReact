import React from 'react';
import { Link } from 'react-router-dom';

const msToTime = (ms) => {
  const seconds = (ms / 1000).toFixed(1);
  const minutes = (ms / (1000 * 60)).toFixed(1);
  const hours = (ms / (1000 * 60 * 60)).toFixed(1);
  const days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return `${seconds} Sec`;
  }
  if (minutes < 60) {
    return `${minutes} Min`;
  }
  if (hours < 24) {
    return `${hours} Hrs`;
  }
  return `${days} Days`;
};

const Track = track => (
  <tr>
    <th>
      <Link to={`detail/${track.trackId}`}>{track.trackCensoredName}</Link>
    </th>
    <th>{track.artistName}</th>
    <th>{track.collectionCensoredName}</th>
    <th>{track.releaseDate}</th>
    <th>
      <img src={track.artworkUrl30} alt={track.collectionCensoredName} />
    </th>
    <th>{msToTime(track.trackTimeMillis)}</th>
    <th>{track.primaryGenreName}</th>
    <th>{track.trackPrice}</th>
  </tr>
);

Track.propTypes = {};

export default Track;
