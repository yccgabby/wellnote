import React from 'react';
import {motion} from 'framer-motion';
import './Header.scss';

export default function Header(props){
     const btnVariants = {
          whileHover : { 
               scale: 1.1 
          },
          whileTap : { 
               scale: 0.9 
          }
     }
     return(
          <>
               <header className="header">
                    <h1 className="header__logo">Wellnote</h1>
                    <article className="header__nav">
                         <p onClick={()=>props.setPage('home')} className="header__nav-item">Home</p>
                         <p onClick={()=>props.setPage('diary')} className="header__nav-item">Diary</p>
                         <motion.button {...btnVariants} className="header__nav-item header__nav-item--entry" onClick={()=>props.setPage('journalEntry')}>Create Journal Entry</motion.button>
                    </article>
               </header>
          </>
     );
    
}