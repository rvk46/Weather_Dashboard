import React, { Component, useState } from 'react';
import './App.css';
import NavBar from './components/navbar'
import Dropdown from './components/Dropdown'
import axios from 'axios'
import Calender from './components/Calender' 
import CityForm from './components/CityForm'
import background from './components/img/background.jpg'

import TempChart from './components/TempChart'

class App extends Component{
  
    constructor() { 
        super();
        this.state = {
          location: [],
          formdata: {
            title : null,
            date : null
          },
          show : false,
          data : []
        };
        
      }
      

      componentDidMount() {
        var result = Array()
        window.addEventListener('keydown', this.tabKeyPressed);
        window.addEventListener('mousedown', this.mouseClicked);
        var Locresponse = ''
        axios.get('/api/city/') 
          .then(function (response) {
            Locresponse = response.data
            var i = 0
            Locresponse.forEach(function(value){
              result.push(
                {
                  id : i,
                  title : value['Cityname'],
                  selected : false,
                  key : 'location' 
                }
              )
              i += 1
             });
             console.log("result",result)
            
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
          
          this.setState({location : result}, function(){
            console.log(this.state)
          })
          
      }
    
      tabKeyPressed = (e) => {
        if (e.keyCode === 9) {
          document.querySelector('body').classList.remove('noFocus');
          window.removeEventListener('keydown', this.tabKeyPressed);
          window.addEventListener('mousedown', this.mouseClicked);
        }
      }
    
      mouseClicked = (e) => {
        document.querySelector('body').classList.add('noFocus');
        window.removeEventListener('mousedown', this.mouseClicked);
        window.addEventListener('keydown', this.tabKeyPressed);
      }
    
      resetThenSet = (id, key) => {
        const temp = JSON.parse(JSON.stringify(this.state[key]));
        temp.forEach((item) => item.selected = false);
        temp[id].selected = true;

        this.setState({
          [key]: temp,
          formdata: {
            title : temp[id].title,
            date : this.state.formdata.date,
            show : this.state.show
          }
        }, function () {
          console.log(this.state);
      });
      }

      getDate = (startDate) => {
        this.setState({
          formdata: {
            title : this.state.formdata.title,
            date : startDate,
            show : this.state.show
          }
        }, function () {
          console.log(this.state);
      });
      }
      getGraphData = (graphData) => {
        
        var result = [...this.state.data]

        graphData.forEach(element => {
          result.push({
            Cid : element["Cid"],
            Date : element["Date"],
            DateTime : element["DateTime"],
            FromTime : element["FromTime"],
            MaxTemperature : element["MaxTemperature"],
            Tid : element["Tid"],
            ToTime : element["ToTime"]
          })
        });
        console.log("graph", result)
        this.setState({result}, function(){
          console.log("graphData", this.state)
        })
        this.setState({show : true})
        
      }
    
    drawGraph(){
      console.log("newshow")
      console.log(this.state)
      
      return(<TempChart value={this.state.result}/>)
    }
    render() {
      const {data} = this.state;
      return (
      <React.Fragment>
        <NavBar /> 
      <div className="App" class="bg_image" >
      
      <div className="content item1">
        
        <h4 style={{textAlign: "left",margin: 10 ,color: "#203771"      }} >Fill in Details to show</h4>
        <h5 style = {{ textAlign: "justify" ,margin: 10 ,color: "#203771"}}>Select location</h5>
          
        <div style = {{margin:10,color:"#194F87"}}className="wrapper" >
          <Dropdown
            searchable={['Search for city', 'No matching city']}
            title="city"  
            list={this.state.location}
            resetThenSet={this.resetThenSet}
          />
        {data}
        </div>

        <h5 style = {{textAlign: "justify" ,margin: 10 ,color: "#203771"}}>Date</h5>
        <div style={{textAlign:"left",margin: 10, color: "blue"}} className="onDate">
          <Calender getDate={this.getDate}/>
        </div>

        {/* <h5 style = {{textAlign: "justify", margin: 10 ,color: "#203771"}}>From Date</h5>
        <div style={{textAlign:"left",margin: 10,color: "blue"}} className="onDate">
          <Calender getDate={this.getDate}>From Date</Calender>
        </div>

        <h5 style = {{textAlign: "justify" ,margin: 10 ,color: "#203771"}}>To Date</h5>  
        <div style={{textAlign:"left",margin: 10, color: "blue"}} className="onDate">
          <Calender getDate={this.getDate}>To date </Calender>
        </div> */}
        <CityForm value={this.state.formdata} getGraphData={this.getGraphData}/>
      </div>
      <div className="content">
        { this.state.show ?this.drawGraph() : <br/>}
      </div>
      </div>
      

       </React.Fragment>
      );
    }
}


export default App;
