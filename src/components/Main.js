import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



class Main extends React.Component{
  constructor(props){
    super();
    this.state={
      searchQuery:'',
      cityName:'',
      lat: 0,
      lon: 0
    };
    
  }

  displayCity = async() => {
    let url=`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`;

    try {
      let cityResponse = await axios.get(url);
      let city = cityResponse.data[0];
      this.setState({cityName: city.display_name, lat: city.lat, lon: city.lon})
    } catch(error) {
      console.log(error);
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.displayCity();
  }

  handleChange = (e) => {
    this.setState({searchQuery: e.target.value})
    console.log(this.state.searchQuery)
  }

  render(){


    return(

      <>
     <Form onSubmit={this.handleSubmit}>
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" placeholder="Enter City" onChange={this.handleChange}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Explore!
      </Button>
    </Form> 
    {this.state.cityName && 
    <>
    <p>{ this.state.cityName }</p>
    <p>{ this.state.lat }</p>
    <p>{ this.state.lon }</p>
    </>
    }
      </>
    )
  }
}

export default Main;