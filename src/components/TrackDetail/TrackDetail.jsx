import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import {
  Container, Row, Col, Button, Image,
} from 'react-bootstrap';
import { fetchTrackDetail } from './TrackDetailActions';

class TrackDetail extends Component {
  constructor(props) {
    super(props);
    const {
      fetchTrackDetailDispatch,
      match: {
        params: { id },
      },
    } = this.props;
    this.state = {
      id,
      index: 0,
      flag: true,
      direction: true,
    };
    fetchTrackDetailDispatch(id);
  }

  componentDidMount = () => {
    this.setIndexTrackSelected();
  };

  componentDidUpdate = () => {
    const {
      match: {
        params: { id },
      },
      fetchTrackDetailDispatch,
      trackDetail,
    } = this.props;

    const { id: stateId, flag } = this.state;

    if (trackDetail.false && flag) {
      this.isTrackDetailInvalid();
    }

    if (stateId !== id) {
      this.setState({ id });
      fetchTrackDetailDispatch(id);
      this.setIndexTrackSelected();
      this.setState({ flag: true });
    }
  };

  setIndexTrackSelected() {
    let index = 0;
    const {
      tracks,
      match: {
        params: { id: trackId },
      },
    } = this.props;

    tracks.filter((track, i) => {
      if (track.trackId.toString() === trackId) {
        index = i;
        return index;
      }
      return false;
    });
    this.setState({ index });
  }

  isTrackDetailInvalid = () => {
    const { direction, index } = this.state;
    const { fetchTrackDetailDispatch, tracks } = this.props;

    const tmpDirecction = direction ? +1 : -1;
    fetchTrackDetailDispatch(tracks[index + tmpDirecction].trackId);
    this.setState({ index: index + tmpDirecction, flag: false });
  };

  gotoNextTrackDetail = () => {
    const {
      tracks,
      history: { push },
    } = this.props;
    const { index } = this.state;
    const { trackId } = tracks[index + 1];
    push(`/detail/${trackId}`);
    this.setState({ index: index + 1, id: trackId, direction: true });
  };

  gotoPreviousTrackDetail = () => {
    const {
      tracks,
      history: { push },
    } = this.props;
    const { index } = this.state;
    const { trackId } = tracks[index - 1];
    push(`/detail/${trackId}`);
    this.setState({ index: index - 1, id: trackId, direction: false });
  };

  renderPreviousBtn = () => {
    const { index } = this.state;
    if (index > 0) {
      return (
        <Button variant="dark round  " className="btn-lg" onClick={this.gotoPreviousTrackDetail}>
          {'<'}
        </Button>
      );
    }

    return null;
  };

  renderNextBtn = () => {
    const { index } = this.state;
    const { tracks } = this.props;
    if (index < tracks.length - 1) {
      return (
        <Button variant="dark round" className="btn-lg" onClick={this.gotoNextTrackDetail}>
          {'>'}
        </Button>
      );
    }

    return null;
  };

  renderSongsNumber = () => {
    const { index } = this.state;
    const { tracks } = this.props;
    if (tracks.length) {
      return `Son ${index + 1} of ${tracks.length}`;
    }

    return null;
  };

  render() {
    const {
      trackDetail,
      history: { push },
    } = this.props;

    if (!Object.prototype.hasOwnProperty.call(trackDetail, 'trackId')) {
      return <h1>Loading</h1>;
    }

    const {
      artworkUrl100,
      previewUrl,
      trackName,
      collectionName,
      artistName,
      primaryGenreName,
    } = trackDetail;

    return (
      <Container>
        <Row>
          <div>
            <Button variant="link" onClick={() => push('/')}>
              Back to search
            </Button>
          </div>
        </Row>
        <Row className="show-grid">
          <Col xs={6} md={4}>
            <Image src={artworkUrl100.replace('100x100', '400x400')} alt={trackName} />
            <div>
              <div className="shareLink">
                <LinkedinShareButton url={window.location.href} quote={trackName}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
              <div className="shareLink">
                <FacebookShareButton url={window.location.href} quote={trackName}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
              <div className="shareLink">
                <TwitterShareButton url={window.location.href} quote={trackName}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
            </div>
          </Col>
          <Col xs={12} md={8}>
            <h2>{trackName}</h2>
            <h3>{collectionName}</h3>
            <h4>{artistName}</h4>
            <p>{primaryGenreName}</p>
            <p>
              <audio controls key={Math.random() + 100}>
                <track kind="captions" />
                <source src={previewUrl} type="audio/mp4" />
                Your browser does not support the audio element.
              </audio>
            </p>
            <p>{this.renderSongsNumber()}</p>
            <p>
              {this.renderPreviousBtn()}
              {'  '}
              {this.renderNextBtn()}
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
TrackDetail.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  trackDetail: PropTypes.shape().isRequired,
  fetchTrackDetailDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ tracks: state.tracks, trackDetail: state.trackDetail });

const mapDispatchToProps = dispatch => ({
  fetchTrackDetailDispatch: (props, id) => dispatch(fetchTrackDetail(props, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackDetail);
