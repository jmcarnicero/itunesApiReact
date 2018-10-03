import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Table } from 'react-bootstrap';
import { setTracks } from '../Search/SearchActions';
import Track from './Track';

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = { orderParam: '', orderAscDes: 'asc' };
  }

  handleOrderBy = (order) => {
    const { orderParam, orderAscDes } = this.state;
    const { tracks, setTracksDispatch } = this.props;

    if (orderParam === order) {
      const orderAscDesTmp = orderAscDes === 'asc' ? 'desc' : 'asc';

      const tracksOrder = _.orderBy(tracks, order, orderAscDesTmp);
      setTracksDispatch(tracksOrder);
      return this.setState({ orderAscDes: orderAscDesTmp, orderParam: order });
    }

    const tracksOrder = _.orderBy(tracks, order, orderAscDes);
    setTracksDispatch(tracksOrder);
    return this.setState({ orderParam: order });
  };

  render() {
    const { tracks } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            <th>Titulo de la canción</th>
            <th>Artista</th>
            <th>Albúm</th>
            <th>Fecha de lanzamiento</th>
            <th>Miniatura</th>
            <th>
              <Button variant="link" onClick={() => this.handleOrderBy('trackTimeMillis')}>
                Duracion
              </Button>
            </th>
            <th>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => this.handleOrderBy('primaryGenreName')}
              >
                Genero
              </button>
            </th>
            <th>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => this.handleOrderBy('trackPrice')}
              >
                Precio
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, i) => (
            <Track key={i.toString()} {...track} />
          ))}
        </tbody>
      </Table>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.any).isRequired,
};
const mapStateToProps = state => ({ tracks: state.tracks });

const mapDispatchToProps = dispatch => ({
  setTracksDispatch: tracks => dispatch(setTracks(tracks)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackList);
