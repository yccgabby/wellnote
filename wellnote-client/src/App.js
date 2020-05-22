import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Header from './components/Header/Header';
import LandingLayout from './components/LandingLayout/LandingLayout';
import DiaryLayout from './components/DiaryLayout/DiaryLayout';
import JournalEntryLayout from './components/JournalEntryLayout/JournalEntryLayout';
import "./global-styles/global.scss"

function App(){
  const [page, setPage] = useState('home');

  const animatePage = (content, key) => {
    const divOptions = {
      transition: { duration: 1, ease: [.26, .75, 0, .99] },
      key: key, 
      initial: { scale: 0.6, opacity: 0, },
      animate: { scale: 1, opacity: 1 }, 
      exit: { 
        scale: 0.6, 
        opacity: 0, 
        transition: {
              duration: 0.3
        } 
      } 
    }
    return (
      <AnimatePresence exitBeforeEnter>
        <motion.div {...divOptions}>
            {content}
        </motion.div>
      </AnimatePresence>
    )
  }

  const content = () => {
    if(page === 'home') return animatePage(<LandingLayout/>, 'home')
    if(page === 'diary') return animatePage(<DiaryLayout/>, 'diary')
    if(page === 'journalEntry') return animatePage(<JournalEntryLayout/>, 'journalEntry')
  }

  return (
    <div className="App">
      <Header setPage={setPage}/>
      { content() }
    </div>
  );
}

export default App;
