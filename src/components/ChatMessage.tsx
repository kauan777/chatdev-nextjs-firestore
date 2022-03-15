import React from 'react';
import { useAuth } from '../hooks/useAuth';

type messageProps = {
    text: string, 
    photoUser: string,  
    nameUser: string,
    idUser: string
}

function ChatMessage({text, photoUser, nameUser, idUser}: messageProps){
    
    const { user } = useAuth()

    const messageClass = idUser === user?.id ? 'sent' : 'received'
    
    return(
      <article className={`messageContainer ${messageClass}`}>
        <img src={`${photoUser}`} alt={nameUser}/>
        <div className='message'>
          <span>{text}</span>
        </div>
      </article>
  );
}

export default ChatMessage;