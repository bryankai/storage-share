import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { submitSearch } from '../actions/spaces';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        console.log(results[0].formatted_address)
        return getLatLng(results[0])
      })
      .then(latLng => this.props.submitSearch(latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    // Removed for HOME SEARCH BAR
    const shiftDown = {
      // marginTop: '64px',
      // zIndex: '5'
    }

    // SPECIAL RENDER FOR THIS HOME SEARCH BAR
    if (!this.props.spaces.isLoading) {
      return <Redirect to="/results"/>
    }

    return (
      <div className='home-search-bar-container' style={shiftDown}>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Spaces...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
      </div>
    );
  }
}

const mapStateToProps = ({spaces}) => {
  return {spaces}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({submitSearch }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
