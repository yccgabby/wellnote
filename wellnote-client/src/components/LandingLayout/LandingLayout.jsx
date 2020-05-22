import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import './LandingLayout.scss';

import landingReadingBook from '../../assets/landing_reading_book.svg';
import landingSocializing from '../../assets/landing_socializing.svg';
import landingExercise from '../../assets/landing_exercise.svg';
import landingMeditating from '../../assets/landing-meditating.svg';

const transition = { duration: 1, ease: [.26,.75,0,.99] };

const objectSets = [
     {
          img : landingReadingBook,
          name : "Journaling",
          desc : "Improving your mental health can mean seeking professional support and treatment, but it can also mean taking steps to improve your emotional health on your own. Use Well Note to set your own mental health goals and we’ll help you with tips and advice.",
          className : "landing__journaling-img"
     },
     {
          img : landingExercise,
          name : "Exercise",
          desc : "Exercise stimulates chemicals like endorphins and serotonin that improve your mood, memory, and learning. Exercising regularly, can reduce your stress and symptoms of mental health conditions, and help with recovery from mental health issues.",
          className : "landing__exercise-img"
     },
     {
          img : landingMeditating,
          name : "Meditation",
          desc : "The goal of meditation is a feeling of relaxation and inner peace. Meditation helps with managing negative emotions, such as anger and fear. If you have unproductive worries, you can train yourself to experience those thoughts completely differently.",
          className : "landing__meditation-img"
     },
     {
          img : landingSocializing,
          name : "Socializing",
          desc : "Research has shown that one sure way of improving your mood is to work on building social connections. Person-to-person contact triggers a release of neurotransmitters that could help to make us more resilient to stress factors in the long run.",
          className : "landing__meditation-img"
     },
]

export default function LandingLayout(props) {
     const [landingContent, setLandingContent] = useState(objectSets[0]);
     const contentPicture = () => (
          <AnimatePresence exitBeforeEnter>
              <div className="main__img-container">
                    <motion.img 
                    transition={transition} 
                    key={landingContent.name} 
                    initial= {{ scale: 0.6, opacity: 0, }}

                    animate= {{ scale: 1, opacity: 1 }} 
                    exit= {{ 
                            scale: 0.6, 
                            opacity: 0, 
                            transition: {
                                duration: 0.3
                            } 
                    }} 
                    className={landingContent.className} src={landingContent.img} alt="landing girl picture"/>
              </div>
          </AnimatePresence>
     )

     const contentBioFormat = () => (
          <AnimatePresence exitBeforeEnter>
               <motion.div transition={transition} key={landingContent.desc} initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0, transition: {duration: 0.3} }}>
                    <h2 className="main__text-sub-heading">{landingContent.name}</h2>
                    <p className="main__text-paragraph">{landingContent.desc}</p>
               </motion.div>
          </AnimatePresence>
     )

     return(
          <>
               <main className="main">
                    {contentPicture()}
                    <article className="main__text-container">
                         {contentBioFormat()}
                         <div className="main__btn-container">
                              <p onClick={()=>setLandingContent(objectSets[0])} className="btn__content" style={landingContent.name === "Journaling" ? { borderBottom: "5px solid #F7BBC3"} : null}>Journaling</p>
                              <p onClick={()=>setLandingContent(objectSets[1])} className="btn__content" style={landingContent.name === "Exercise" ? { borderBottom: "5px solid #F7BBC3"} : null}>Exercise</p>
                              <p onClick={()=>setLandingContent(objectSets[2])} className="btn__content" style={landingContent.name === "Meditation" ? { borderBottom: "5px solid #F7BBC3"} : null}>Meditation</p>
                              <p onClick={()=>setLandingContent(objectSets[3])} className="btn__content" style={landingContent.name === "Socializing" ? { borderBottom: "5px solid #F7BBC3"} : null}>Socializing</p>
                         </div>
                    </article>
               </main>
          </>
     );
}

