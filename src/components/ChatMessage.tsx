import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React from 'react';

type messageProps = {
    text: string, 
    photoUser: string,  
    nameUser: string,
    idUser: string
}

function ChatMessage({text, photoUser, nameUser, idUser}: messageProps){
    
    const { data } = useSession()
    const messageClass = idUser === data?.user?.email ? 'sent' : 'received'

    const item = {
      hidden: { y: 100, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1
      }
    }
    
    return(
      <motion.article variants={item} initial="hidden" animate="visible" className={`messageContainer ${messageClass}`}>
        <img src={`${photoUser}`} alt={nameUser}/>
        <div className='message'>
          <span>{text}</span>
        </div>
      </motion.article>
  );
}

export default ChatMessage;