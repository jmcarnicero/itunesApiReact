import React from 'react';
import { Container } from 'react-bootstrap';
import Search from './components/Search/Search';
import TrackList from './components/TracksList/TrackList';

const App = () => (
  <div className="App">
    <Container>
      <h1>Itunes API Search</h1>
      <Search />
      <TrackList />
    </Container>
  </div>
);

export default App;
