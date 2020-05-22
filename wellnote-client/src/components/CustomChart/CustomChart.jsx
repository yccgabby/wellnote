import React, {useState} from 'react';
import pen from '../../assets/pen.svg';
import './CustomChart.scss';

export default function CustomChart(props) {
    console.log(props.monday)
     return(
          <>
               <article className="journal-chart">
                   <div className="journal-chart__title">
                        <p>{props.title}</p>
                        <p>Week 1</p>
                    </div>
                    <div className="journal-chart__side-bar">
                        <p>1</p>
                        <p>0</p>
                    </div>
                    <div className="journal-chart__goal" style={{top: `${250 - 120}px`}}>  {/* max is - 120 */}
                        <p>Goal</p>
                        <div className="journal-chart__goal-line"/>
                    </div>
                    <div className="journal-chart__graph-container">
                        <div></div>
                        <div className="journal-chart__bar" style={{height: `${30 + (props.monday + 30)}px`}}> {/* max is + 180 */}
                            <p>M</p>
                        </div>
                        <div className="journal-chart__bar" style={{height: `${30 + 0}px`}}>
                            <p>T</p>
                        </div>
                        <div className="journal-chart__bar" style={{height: `${30 + 0}px`}}>
                            <p>W</p>
                        </div>
                        <div className="journal-chart__bar" style={{height: `${30 + 0}px`}}>
                            <p>T</p>
                        </div>
                        <div className="journal-chart__bar" style={{height: `${30 + 0}px`}}>
                            <p>F</p>
                        </div>
                        <div className="journal-chart__bar" style={{height: `${30 + 0}px`}}>
                            <p>S</p>
                        </div>
                        <div className="journal-chart__bar" style={{height: `${30 + 0}px`}}>
                            <p>S</p>
                        </div>
                    </div>
               </article>
          </>
     );
}

