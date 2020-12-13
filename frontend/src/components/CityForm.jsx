import React, { Component, useState } from 'react';
import axios from 'axios'
class CityForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: [],
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      const { getGraphData } = this.props;
      var result = Array()
      var obj = this
        axios.get('/api/temp?city=' + this.props.value.title + '&' + 'date=' + this.props.value.date.toLocaleDateString('en-IN'), 
        )
        .then(function (response) {
          result = response.data
          console.log(response)
          obj.setState({data : result}, getGraphData(result))
        })
        .catch(function (error) {
          console.log(error);
        })
        event.preventDefault();
      
      
    }

    render() {
      
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
        <button>Send data!</button>
        </form>      
        </div>
       
      );
    }
  }

  export default CityForm
