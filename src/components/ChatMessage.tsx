import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

type messageProps = {
    text: string, 
    photoUser: string,  
    nameUser: string,
    idUser: string
}

function ChatMessage({text, photoUser, nameUser, idUser}: messageProps){
    
    const { data } = useSession()


    const messageClass = idUser === data?.user?.email ? 'sent' : 'received'
    
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