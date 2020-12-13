import React, { Component, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default class TempChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {
            labels: [],
            datasets: [{
                label : "Max Temperature",
                data: [],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        }
    };
    this.result = {
        labels: [],
        datasets: [{
            label : "Max Temperature",
            data: [],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    }
    }
  
    componentDidMount() {
        var data = this.props.value
        console.log(data)
        var labels = Array()
        var maxTemp = Array()
        data.forEach(function(value){
            labels.push(
                value["FromTime"]
            )
            maxTemp.push(
                value["MaxTemperature"]
            )
        });
        this.result = {
            labels: labels,
            datasets: [{
                label : "Max Temperature",
                data: maxTemp,
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        }
        this.setState({            
            data : {
                labels : labels,
                datasets : [{
                    label: "Max temperature",
                    data : maxTemp
                }]
            }
        }, function(){
            console.log("chart", this.state.data)
        })
    }
    componentDidUpdate(){
        var data = this.props.value
        console.log("update",data)
        console.log(this.state)
        var labels = Array()
        var maxTemp = Array()
        data.forEach(function(value){
            labels.push(
                value["FromTime"]
            )
            maxTemp.push(
                value["MaxTemperature"]
            )
        });
        this.result = {
            labels: labels,
            datasets: [{
                label : "Max Temperature",
                data: maxTemp,
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        }
        
    }
    
    render() {
      return ( <Line
        data={this.result}
        width={250}
        height={500}
        options={{ maintainAspectRatio: false }}
      />)
    }
  }