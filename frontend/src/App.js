import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar'
import Dropdown from './components/Dropdown'


class App extends Component{
    constructor() {
        super();
        this.state = {
          location: [
            {
              id: 0,
              title: 'Noida',
              selected: false,
              key: 'location',
            },
            {
              id: 1,
              title: 'Jaipur',
              selected: false,
              key: 'location',
            },
          ],

          time: [
            {
              id: 0,
              title: '09/10/12',
              selected: false,
              key: 'time',
            }]  
        };
      }

    
      componentDidMount() {
        window.addEventListener('keydown', this.tabKeyPressed);
        window.addEventListener('mousedown', this.mouseClicked);
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
    
      toggleItem = (id, key) => {
        const temp = JSON.parse(JSON.stringify(this.state[key]));
        temp[id].selected = !temp[id].selected;
        this.setState({
          [key]: temp,
        });
      }
    
      resetThenSet = (id, key) => {
        const temp = JSON.parse(JSON.stringify(this.state[key]));
        temp.forEach((item) => item.selected = false);
        temp[id].selected = true;
        this.setState({
          [key]: temp,
        });
      }


    render() {return (

      

      <React.Fragment>


       <NavBar />
        
       <div className="App">
        <p><h1>Select Details to show</h1></p>


        <h3>Select location</h3>

        <div className="wrapper">
          <Dropdown
            searchable={['Search for city', 'No matching city']}
            title="Select location"
            list={this.state.location}
            resetThenSet={this.resetThenSet}
          />
        </div>
        <h3>Date</h3>
        <div className="wrapper">
          <Dropdown
            searchable={['Enter Date', 'no match']}
            title="DD-MM-YYYY"
            list={this.state.time}
            resetThenSet={this.resetThenSet}
          />
        </div>

        <h3>From Date</h3>
        <div className="wrapper">
          <Dropdown
            searchable={['Enter Date', 'no match']}
            title="DD-MM-YYYY"
            list={this.state.time}
            resetThenSet={this.resetThenSet}
          />
        </div>

        <h3>To Date</h3>
        <div className="wrapper">
          <Dropdown
            searchable={['Enter Date', 'no match']}
            title="DD-MM-YYYY"
            list={this.state.time}
            resetThenSet={this.resetThenSet}
          />
        </div>

        <button type="button" className="btn btn-danger">SHOW</button>

      </div>


       </React.Fragment>
      );
    }
}

export default App;
