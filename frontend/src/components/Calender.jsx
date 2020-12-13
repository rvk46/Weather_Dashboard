import React, {Component, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class Calender extends Component {
  constructor() { 
    super();
    this.state = {
      startDate: new Date()
    };
    
  }
  

  render() {
    const { startDate } = this.state;
    return <DatePicker selected={startDate} onChange={this.handleChange} />;
  }

  handleChange = startDate => {
    const { getDate } = this.props;
    this.setState({
      startDate
    }, getDate(startDate));
  };
}

export default Calender;