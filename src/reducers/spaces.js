import { getDistance } from "../helper/helper";
import { FETCH_SPACES_SUCCESS, FETCH_ONE_SPACE, UPDATE_SEARCH_LOCATION } from '../actions/spaces'

// Helper Functions
const filterForActiveNearbySpaces = (payload) => {
  if(payload) {
    const filteredSpaces =  payload.spaces.filter((space, index)=> {
      if(space.active) {
        const spaceLocation = {lat: space.lat, lng: space.lng}
        const distance = getDistance(spaceLocation, payload.searchLocation)
        console.log(distance,payload.range)
        if(distance<payload.range) {
          console.log(index, distance, spaceLocation)
          return true
        }
      }
      return false
    })
    console.log('filteredSpaces',filteredSpaces)
    return filteredSpaces
  }
}

// Reducers
export const spaces = (state = [], action) => {
  switch(action.type){
    case FETCH_SPACES_SUCCESS:
      return filterForActiveNearbySpaces(action.payload)
    case FETCH_ONE_SPACE:
      return action.payload
    default:
      return state
  }
}

export const searchLocation = (state = null, action) => {
  console.log(action.payload)
  switch(action.type){
    case UPDATE_SEARCH_LOCATION:
    console.log('location action.payload')
      return action.payload
    default:
      console.log('location state')
      return state
  }
}
