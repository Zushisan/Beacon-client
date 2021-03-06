import React from 'react'
import Resource from '../models/resource'
import Cities from './Cities'
// import { Route, Redirect, Switch, Link } from 'react-router-dom'
const RegionsList = Resource('regions')
// const CitiesList = Resource('regions', 'cities')

class Regions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regions: [],
      region_id: 0,
      errors: null,
      cities: null
    }
  }

  componentWillMount() {
    RegionsList.findAll()
      .then((result) => this.setState({ regions: result.data, errors: null }))
      .catch((errors) => this.setState({ errors: errors }))
  }

  loadCitiesMarker = cities => {
    this.props.getMarkers(cities)
  }

  loadChildren = (region_id, region) => {
    this.setState({region_id: region_id})
    let lat = (region.least_lat + region.greatest_lat) / 2
    let lng = (region.least_lng + region.greatest_lng) / 2

    this.props.getMapCenter(lat, lng, [
      { lat: region.least_lat, lng: region.greatest_lng },
      { lat: region.least_lat, lng: region.least_lng }, 
      { lat: region.greatest_lat, lng: region.least_lng },
      { lat: region.greatest_lat, lng: region.greatest_lng }
    ])    

  }

  listPresenter(){
    // console.log(this.props.completedAchievements.regions)
    const list = this.state.regions.map((region) => {
      if (region.id === this.state.region_id) {
        if (this.props.completedAchievements.regions.hasOwnProperty(region.id) && this.props.completedAchievements.regions[region.id]){
          return (
            <div>
              <button className="achievement region complete" onClick={event => {this.loadChildren(region.id, region)}}>
                {region.name}
              </button>
              {<Cities getCityId={this.props.getCityId} region_id={this.state.region_id} getCitiesMarker={this.loadCitiesMarker} getMapCenter={this.props.getMapCenter} completedAchievements={this.props.completedAchievements}/>}
            </div>)
        } else {
          return (
            <div>
              <button className="achievement region" onClick={event => {this.loadChildren(region.id, region)}}>
                {region.name}
              </button>
              {<Cities getCityId={this.props.getCityId} region_id={this.state.region_id} getCitiesMarker={this.loadCitiesMarker} getMapCenter={this.props.getMapCenter} completedAchievements={this.props.completedAchievements}/>}
            </div>)
        }
      } else {
        if (this.props.completedAchievements.regions.hasOwnProperty(region.id) && this.props.completedAchievements.regions[region.id]){
          return (
            <div>
              <button className="achievement region complete" onClick={event => {this.loadChildren(region.id, region)}}>
                {region.name}
              </button>
            </div>)
        } else {
          return (
            <div>
              <button className="achievement region" onClick={event => {this.loadChildren(region.id, region)}}>
                {region.name}
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

export default Regions