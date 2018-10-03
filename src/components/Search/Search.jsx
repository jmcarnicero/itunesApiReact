import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { fetchSearch } from './SearchActions';

class Search extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const serachValue = e.target.search.value;
    const { fetchSearchDispatch } = this.props;
    fetchSearchDispatch(serachValue);
  };

  render = () => (
    <div>
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Search :</Form.Label>
          <Form.Control
            type="text"
            name="search"
            placeholder="michael jackson"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      ;
    </div>
  );
}

Search.propTypes = {
  fetchSearchDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchSearchDispatch: search => dispatch(fetchSearch(search)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Search);
