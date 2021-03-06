import React, { Component } from 'react';
import {Row, Col} from 'react-materialize'
import SpaceList from './SpaceList'
import MapContainer from './MapContainer'
import SearchBar from './SearchBar'

import '../styles/Results.css';

class Results extends Component {
  render() {
    const shiftDown = {
      margin: '70px',
    }

    return (
      <div>
        <Row style={shiftDown}>
          <Col s={6} m={6} l={8} id='spacelist-column'>
            <h4> Search Results </h4>
            <SpaceList/>
          </Col>
          <Col s={6} m={6} l={4} id='map-column'>
            <SearchBar/>
            <MapContainer />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Results;
