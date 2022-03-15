import React, { useEffect, useState } from 'react';
import { collection, doc, limit, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import Scroll from 'react-scroll';
import { useAuth } from '../hooks/useAuth';
import { db } from '../services/firebase';
import ChatMessage from './ChatMessage';
import styles from '../../styles/Chat.module.scss';
import { FiLogOut } from 'react-icons/fi'
import {v4 as uuidv4} from 'uuid';
import NotificationMessage from './NotificationMessage';
import { useNotification } from '../hooks/useNotification';

type TypeMessage = {
  id: string,
  text: string,
  nameUser: string,
  photoUser: string,
  userId: string
}

const ChatDev: React.FC = () => {

  async function addMessage(
    nameUser: string | undefined, 
    photoUser: string | undefined, 
    text: string | undefined, 
    userId: string | undefined
    ){
    await setDoc(doc(db, "messages", `${uuidv4()}`), {
      nameUser: nameUser,
      photoUser: photoUser,
      text: text,
      userId: userId,
      createdAt: new Date()
    });
    setText("");
    Scroll.animateScroll.scrollToBottom({ smooth: 'linear', duration: 0 });
  }

  const {newMessage, setNewMessage } = useNotification();
  const [messages, setMessages] = useState([])
  const [textMessage, setText] = useState('');
  const [amountMessages, setAmountMessages] = useState(null as number | null);

  const { user, signOut } = useAuth();

  useEffect(() => {

    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"), limit(40));

    const ubsub = onSnapshot(q, (snapshot: any) => {
      setMessages(snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
      //Scroll.animateScroll.scrollToBottom({ smooth: 'linear', duration: 0 });

    });

    return ubsub;

  }, []);

  useEffect(() => {
    
    if(messages.length !== 0 && amountMessages === null){
      setAmountMessages(messages.length)
    }
    
    if(messages.length !== 0 && messages.length !== amountMessages && amountMessages !== null){
      
      const { userId } = messages[messages.length - 1]
       if(userId !== user?.id){
         setNewMessage(true)
         setTimeout(() => {
          setNewMessage(false)
         }, 4000)
      }
      setAmountMessages(messages.length)
    }

  }, [messages, amountMessages])
  

  return (
    <main>
      {newMessage && <NotificationMessage/>}
      <section className={styles.menuHeader}>
        <div className={styles.profileContent}>
          <img src={`${user?.avatar}`} alt={user?.name}/>
          <span>{user?.name}</span>
        </div>

        <button onClick={signOut}>
          <FiLogOut color='#fff' size={24}/>
        </button>

      </section>

      <section className={styles.contentMessages}>
        {
          messages && messages.map((message: TypeMessage) => {
            return (
              <ChatMessage
                key={message.id}
                text={message.text}
                photoUser={message.photoUser}
                nameUser={message.nameUser}
                idUser={message.userId}
              />
            )
          })}
      </section>

      <section className={styles.containerSubmitMessage}>
        <div className={styles.inputSubmit}>
          <input 
            type="text" 
            placeholder='Say something nice...' 
            value={textMessage}
            onChange={(e) => setText(e.target.value)}
            />
          <button type='button' onClick={() => addMessage(user?.name, user?.avatar, textMessage, user?.id)}>Send</button>
        </div>
      </section>


    </main>
  );
}

export default ChatDev;

// Create one compnent called Message-notification
//If the user not be in the page, use the native notification
//lógic to hidden and show notification

// Add middleware of the notification



