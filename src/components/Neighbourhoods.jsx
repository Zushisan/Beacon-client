import React from 'react'
import Resource from '../models/resource'
import Locations from './Locations'

const NeighbourhoodsList = Resource('cities', 'neighbourhoods')

class Neighbourhoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      neighbourhood_id: 0,
      errors: null,
      neighbourhoods: [],
      city_id: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.city_id !== this.state.city_id){      
      NeighbourhoodsList.findAllChildren(nextProps.city_id)
        .then((result) => {
          this.setState({ neighbourhoods: result.data, errors: null, city_id: this.props.city_id })
          this.props.getMarkers(result.data)
        })
        .catch((errors) => this.setState({ errors: errors }))
    }
  }

  loadChildren = (neighbourhood_id, neighbourhood) => {
    this.setState({neighbourhood_id: neighbourhood_id})
    let lat = (neighbourhood.least_lat + neighbourhood.greatest_lat) / 2
    let lng = (neighbourhood.least_lng + neighbourhood.greatest_lng) / 2

    this.props.getMapCenter(lat, lng, [
      { lat: neighbourhood.least_lat, lng: neighbourhood.greatest_lng },
      { lat: neighbourhood.least_lat, lng: neighbourhood.least_lng },
      { lat: neighbourhood.greatest_lat, lng: neighbourhood.least_lng },
      { lat: neighbourhood.greatest_lat, lng: neighbourhood.greatest_lng }
    ]) 
  }

  listPresenter() {
    const list = this.state.neighbourhoods.map((neighbourhood) => {
      if (neighbourhood.id === this.state.neighbourhood_id) {

        if (this.props.completedAchievements.neighbourhoods.hasOwnProperty(neighbourhood.id) && this.props.completedAchievements.neighbourhoods[neighbourhood.id]){
          return (
            <div>
              <button className="achievement neighbourhood complete" 
                onClick={event => { this.loadChildren(neighbourhood.id, neighbourhood) }} 
                // onMouseOver={() => this.props.mouseOverComplete(neighbourhood)} 
                // onMouseOut={() => this.props.mouseOut()}
              >
                {neighbourhood.name}
              </button>
                {<Locations 
                neighbourhood_id={this.state.neighbourhood_id} 
                getLocationsMarkers={this.props.getLocationsMarkers} 
                completedAchievements={this.props.completedAchievements}
                mouseOverComplete={this.props.mouseOverCompleteLocation}
                mouseOverIncomplete={this.props.mouseOverIncompleteLocation}
                mouseOut={this.props.mouseOut}
                getLatestAchievementList={this.props.getLatestAchievementList}
                />}
            </div>)
        } else {
          return (
            <div>
              <button className="achievement neighbourhood" 
                onClick={event => {this.loadChildren(neighbourhood.id, neighbourhood)}}
                // onMouseOver={() => this.props.mouseOverIncomplete(neighbourhood)}
                // onMouseOut={() => this.props.mouseOut()}
              >
                {neighbourhood.name}
              </button>
                {<Locations 
                neighbourhood_id={this.state.neighbourhood_id} 
                getLocationsMarkers={this.props.getLocationsMarkers} 
                completedAchievements={this.props.completedAchievements}
                mouseOverComplete={this.props.mouseOverCompleteLocation}
                mouseOverIncomplete={this.props.mouseOverIncompleteLocation}
                mouseOut={this.props.mouseOut}
                getLatestAchievementList={this.props.getLatestAchievementList}
                />}
            </div>)
        }
      } else {
        if (this.props.completedAchievements.neighbourhoods.hasOwnProperty(neighbourhood.id) && this.props.completedAchievements.neighbourhoods[neighbourhood.id]){
          return (
            <div>
              <button className="achievement neighbourhood complete" onClick={event => {this.loadChildren(neighbourhood.id, neighbourhood)}}>
                {neighbourhood.name}
              </button>
            </div>)
        } else {
          return (
            <div>
              <button className="achievement neighbourhood" onClick={event => {this.loadChildren(neighbourhood.id, neighbourhood)}}>
                {neighbourhood.name}
              </button>
            </div>)
        }
      }
    })
    return list
  }

  render() {
    return (
        <div>
          {this.listPresenter()}
        </div>
    )
  }
}

export default Neighbourhoods