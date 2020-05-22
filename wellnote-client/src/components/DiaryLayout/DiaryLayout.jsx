import React, {useState, useEffect} from 'react';
import {
    Stitch,
    AnonymousCredential,
    RemoteMongoClient
  } from "mongodb-stitch-browser-sdk";
import moment from 'moment';
import CustomChart from '../CustomChart/CustomChart';
import EmotionCircleGraph from './EmotionCircleGraph';
import './DiaryLayout.scss';

import pen from '../../assets/pen.svg';
import backIcon from '../../assets/back-icon.svg';
import forwardIcon from '../../assets/forward-icon.svg';

export default function DiaryLayout(props) {
    const [journalEntry, setJournalEntry] = useState('test')
    useEffect(()=>{
        // 1. Connect to MongoDB
        // It’s simple to point Stitch to a MongoDB collection
        // 1. Connect to MongoDB
        // It’s simple to point Stitch to a MongoDB collection
        const stitchClient = Stitch.initializeAppClient('wellnote-klouw');
        console.log('test')
        // Connect to a MongoDB Atlas database
        const db = stitchClient
            .getServiceClient(RemoteMongoClient.factory, 'wellnote-atlas')
            .db('wellnote-entries');
        // Anonymously authenticate, then add and retrieve documents.
        stitchClient.auth.loginWithCredential(new AnonymousCredential())
        .then(() =>
            db.collection("entry").find().asArray()
        ).then((docs) => {
            console.log(docs);
        })
        .then(() =>
            db.collection("analysis").find().asArray()
        ).then((docs) => {
            setJournalEntry(docs[0])
        }) 
    },[])
    console.log(journalEntry)
     return(
          <>
               <section className="diary-layout">
                    <button className="diary--warning-alert">Please open this page on a device with at least 1024px</button>
                    <div className="diary__container">
                        <div className="diary-book">
                                <div className="diary__analytics">
                                    <h1 className="diary__analytics__title">Journal Analysis</h1>
                                    <div className="diary__analytics__chart-container">
                                        <CustomChart title="Mood" monday={journalEntry.score}/>
                                    </div>
                                </div>
                                <div className="diary__entry">
                                <div className="diary__entry__top">
                                    <img src={backIcon} alt="back"/>
                                    <h3>{moment().format('MMMM Do YYYY')}</h3>
                                    <img src={forwardIcon} alt="foward"/>
                                </div>
                                <p className="diary__entry__text">{journalEntry.transcript}</p>
                                <h4 className="diary__entry__daily-emotion">Daily Emotion Analysis</h4>
                                <div className="diary__analytics__emotions-container">
                                        <div className="diary__analytics__emotions">
                                            <EmotionCircleGraph labels="Joy" value={70}/>
                                        </div>
                                        <div className="diary__analytics__emotions">
                                            <EmotionCircleGraph labels="Sadness" value={20}/>
                                        </div>
                                        <div className="diary__analytics__emotions">
                                            <EmotionCircleGraph labels="Disgust" value={5}/>
                                        </div>
                                        <div className="diary__analytics__emotions">
                                            <EmotionCircleGraph labels="Contempt" value={0}/>

                                        </div>
                                        <div className="diary__analytics__emotions">
                                            <EmotionCircleGraph labels="Anger" value={0}/>

                                        </div>
                                        <div className="diary__analytics__emotions">
                                            <EmotionCircleGraph labels="Fear" value={0}/>

                                        </div>
                                        <div className="diary__analytics__emotions">
                                            <EmotionCircleGraph labels="Suprise" value={10}/>

                                        </div>
                                        <div className="diary__analytics__emotions">
                                            <EmotionCircleGraph labels="Engagement" value={10}/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <img className="diary-pen" src={pen} alt="pen"/>
                    </div>
               </section>
          </>
     );
}

