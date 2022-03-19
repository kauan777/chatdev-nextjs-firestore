import React, { useEffect, useState } from 'react';
import { collection, doc, limit, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import Scroll from 'react-scroll';
import { db } from '../src/services/firebase';
import ChatMessage from '../src/components/ChatMessage';
import styles from '../styles/Chat.module.scss';
import { FiLogOut } from 'react-icons/fi'
import {v4 as uuidv4} from 'uuid';
import NotificationMessage from '../src/components/NotificationMessage';
import { useNotification } from '../src/hooks/useNotification';
import { useSession } from 'next-auth/react';

type TypeMessage = {
  id?: string,
  text: string,
  nameUser: string,
  photoUser: string,
  userId: string
}



const ChatDev: React.FC = () => {
  
  const { data } = useSession()
  const {newMessage, setNewMessage } = useNotification();
  const [messages, setMessages] = useState([])
  const [textMessage, setText] = useState('');
  const [amountMessages, setAmountMessages] = useState(null as number | null);

  async function addMessage({nameUser, photoUser, text, userId }: TypeMessage){
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

  const messageParameter: TypeMessage = {
    nameUser: String(data?.user?.name), 
    photoUser: String(data?.user?.image), 
    text: textMessage, 
    userId: String(data?.user?.email)
  }

  //const { user, signOut }: any = useState();
  //arrumar

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
       if(userId !== data?.user?.email){
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
          <img src={`${data?.user?.image}`} alt={`${data?.user?.name}`}/>
          <span>{data?.user?.name}</span>
        </div>

        <button onClick={() => console.log("oi")}>
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
          <button type='button' onClick={() => addMessage(messageParameter)}>Send</button> 
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



