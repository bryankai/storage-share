import { getDistance } from "../helper/helper";
import {
  SET_SEARCH_STRING,
  FETCH_SPACES_PENDING,
  FETCH_SPACES_SUCCESS,
  FETCH_SPACES_FAILED,
  FETCH_ONE_SPACE,
  UPDATE_SEARCH_LOCATION
} from '../actions/spaces'

// Helper Functions
const filterForActiveNearbySpaces = (payload) => {
  if(payload) {
    const filteredSpaces =  payload.spaces.filter((space, index)=> {
      if(space.active) {
        const spaceLocation = {lat: space.lat, lng: space.lng}
        const distance = getDistance(spaceLocation, payload.searchLocation)
        if(distance<payload.range) {
          return true
        }
      }
      return false
    })
    return filteredSpaces
  }
}

// Reducers
let spacesInitialState = {
  spaces: null,
  isLoading: true,
  showError: false,
  searchString: ''
};

export const spaces = (state = spacesInitialState, action) => {
  switch(action.type){
    case SET_SEARCH_STRING:
      return {...state, searchString: action.payload}
    case FETCH_SPACES_PENDING:
      return {...state, isLoading: true}
    case FETCH_SPACES_SUCCESS:
      return {...state, isLoading: false, spaces: filterForActiveNearbySpaces(action.payload)}
    case FETCH_SPACES_FAILED:
      return {...state, isLoading: false, showError: true}
    default:
      return state
  }
}

export const oneSpace = (state={}, action) => {
  switch(action.type) {
    case FETCH_ONE_SPACE:
      return action.payload
    default:
      return state
  }
}

export const searchLocation = (state = null, action) => {
  switch(action.type){
    case UPDATE_SEARCH_LOCATION:
      return action.payload
    default:
      return state
  }
}
