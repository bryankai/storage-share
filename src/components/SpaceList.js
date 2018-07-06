import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row} from 'react-materialize'
import Space from './Space'
import '../styles/Home.css';

import { fetchSpaces } from '../actions/spaces';

class SpaceList extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     spaces: [
  //       {id: 1, name: "Nice basement"},
  //       {id: 2, name: "Mom's attic"},
  //       {id: 3, name: 'Spacious Clean Garage'},
  //       {id: 4, name: 'Outdoor shed'},
  //       {id: 5, name: 'Spare bedroom'},
  //     ]
  //   }
  // }

  // Mounting Methods
  componentDidMount = () => {
    this.props.fetchSpaces()
  }

  render() {
    console.log(this.props.spaces)
    const Spaces = this.props.spaces.map(space => {
      return (
        <Space key={space.id} space={space}/>
      )
    })

    const spaceListStyle = {
      display: 'flex',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap'
    }

    return (
      <Row className="space-list-grid" style={spaceListStyle}>
        {Spaces}
      </Row>
    )
  }
}

const mapStateToProps = ({spaces, auth}) => {
  return {spaces, auth}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchSpaces}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SpaceList)
