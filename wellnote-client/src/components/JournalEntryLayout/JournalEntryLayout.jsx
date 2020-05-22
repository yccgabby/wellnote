import React, {useEffect, useState} from 'react';
import { SentimentAnalysis } from './SentimentAnalysis';
import './JournalEntryLayout.scss'

export default function JournalEntryLayout(){
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.innerHTML = SentimentAnalysis
        document.body.appendChild(script);
        console.log(localStorage.getItem("entrySentiment"))
        return () => document.body.removeChild(script);
      },[]);
    return(
        <section className="journal-entry-layout">
            <button className="diary--warning-alert">Please open this page on a device with at least 1024px</button>
            <div className="card" id="card">
                <div className="card__img" id="affdex_elements">
                <div className="tracking__results">
                        <div className="tracking__results-container">
                            <strong>EMOTION TRACKING RESULTS</strong>
                            <div id="results"></div>
                            <div id="formats">Format: start recording to see sample rate</div>
                            <ol id="recordingsList"></ol>
                        </div>
                    </div>
                </div>
                <div className="card__description">
                    <div className="card__container">
                    <div className="card__info">
                        <h1 className="card__title">Journal Entry</h1>
                        <h2 className="card__subtitle"> Press the start button to start journaling. When a face is detected, the probabilities of the different emotions are written to the DOM. <br/> <br/>Press the stop button to end the recording. </h2>
                        <div className="card__button-container">
                            <button id="start" className="card__button">Start</button>
                            <button id="stop" onClick="onStop();" className="card__button">Stop</button>
                            <button id="reset" onClick="onReset()" className="card__button">Reset</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}