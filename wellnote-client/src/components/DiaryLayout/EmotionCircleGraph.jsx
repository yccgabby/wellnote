
import React from 'react';
import Chart from 'react-apexcharts'
class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [this.props.value],
        colors: ["#ffff00"],        
        options: {
          chart: {
            height: 150,
            type: 'radialBar',
            toolbar: {
              show: true
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
               hollow: {
                margin: 0,
                size: '20%',
                background: '#fff',
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: 'front',
                dropShadow: {
                  enabled: true,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24
                }
              },
              track: {
                background: '#fff',
                strokeWidth: '67%',
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: -5,
                  left: 0,
                  blur: 4,
                  opacity: 0.35
                }
              },
          
              dataLabels: {
                show: true,
                name: {
                  offsetY: -5,
                  show: true,
                  color: '#888',
                  fontSize: '14px'
                },
                value: {
                  formatter: function(val) {
                    return parseInt(val);
                  },
                  offsetY: 5,
                  color: '#888',
                  fontSize: '20px',
                  show: true,
                }
              }
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "vertical",
              gradientToColors: ["#87D4F9"],
              stops: [0, 100]
            }
          },
          stroke: {
            lineCap: 'round'
          },
          labels: [this.props.labels],
        },
      
      
      };
    }

  

    render() {
      return (
            <Chart options={this.state.options} series={this.state.series} type="radialBar" height={350} />
      );
    }
}

export default ApexChart;