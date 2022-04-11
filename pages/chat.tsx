import Scroll from 'react-scroll';
import ChatMessage from '../src/components/ChatMessage';
import React, { useEffect, useRef, useState } from 'react';
import NotificationMessage from '../src/components/NotificationMessage';
import styles from '../styles/Chat.module.scss';
import { db } from '../src/services/firebase';
import { motion } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi'
import {v4 as uuidv4} from 'uuid';
import { useNotification } from '../src/hooks/useNotification';
import { signOut, useSession } from 'next-auth/react';
import { collection, doc, limit, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';

type TypeMessage = {
  id?: string,
  text: string,
  nameUser: string,
  photoUser: string,
  userId: string
}

const ChatDev: React.FC = () => {
  
  const { data } = useSession() //Data User Loged
  const {newMessage, setNewMessage } = useNotification();
  const [messages, setMessages] = useState([])
  const [distanceBottomInput, setDistanceBottomInput] = useState(Number)
  const [textMessage, setText] = useState('');
  const [amountMessages, setAmountMessages] = useState(null as number | null);

  async function addMessage(e: any, {nameUser, photoUser, text, userId }: TypeMessage){
    e.preventDefault();

    if(textMessage !== ""){
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
  }

  const messageParameter: TypeMessage = {
    nameUser: String(data?.user?.name), 
    photoUser: String(data?.user?.image), 
    text: textMessage, 
    userId: String(data?.user?.email)
  }

  const inputMessage: any = useRef();

  useEffect(() => { 
    Scroll.animateScroll.scrollToBottom({ smooth: 'linear', duration: 0 });
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"), limit(40));

    const ubsub = onSnapshot(q, (snapshot: any) => {
      setMessages(snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    });

    return ubsub;

  }, []);

  useEffect(() => {
    
    console.log("altura da tela: " + window.innerHeight)
    console.log("bottom input:" +  inputMessage.current?.getBoundingClientRect().bottom)
    console.log("dim:", window.innerHeight - inputMessage.current?.getBoundingClientRect().bottom)

    //setDistanceBottomInput(inputMessage.current?.getBoundingClientRect().bottom)
    

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

      const container = {
      hidden: { opacity: 0,},
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 2,
          staggerChildren: 4
        }
      }
    }

  return (
    <main>
      {newMessage && <NotificationMessage/>}
      <section className={styles.menuHeader}>
        <div className={styles.profileContent}>
          <img src={`${data?.user?.image}`} alt={`${data?.user?.name}`}/>
          <span>{data?.user?.name}</span>
        </div>

        <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/foo' })}>
          <FiLogOut color='#fff' size={24}/>
        </button>
      </section>

      <motion.section variants={container} initial="hidden" animate="visible" className={styles.contentMessages}>
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
      </motion.section>

      <section 
        className={styles.containerSubmitMessage}>
        <form className={styles.inputSubmit} onSubmit={(e) => addMessage(e, messageParameter)}>
          <input 
            ref={inputMessage}
            type="text" 
            placeholder='Say something nice...' 
            value={textMessage}
            onChange={(e) => setText(e.target.value)}
            />
          <button type='submit'>Send</button> 
        </form>
      </section>
    </main>
  );
}

export default ChatDev;




