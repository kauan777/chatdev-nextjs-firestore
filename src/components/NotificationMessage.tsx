import React from 'react';
import styles from '../../styles/NotificationMessage.module.scss';
import Scroll from 'react-scroll';
import { motion } from 'framer-motion';
import { useNotification } from '../hooks/useNotification';

function NotificationMessage(){

  const { setNewMessage } = useNotification();

  const item = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
      <div className={styles.containerNotificationMessage}>
        <motion.div 
        variants={item}
        initial="hidden"
        animate="visible"
        className={styles.contentNotificationMessage} onClick={() =>{
            Scroll.animateScroll.scrollToBottom({ smooth: 'linear', duration: 0 });
            setNewMessage(false)
        }}>
        <span>New message</span>
        </motion.div>
      </div>
    );
}

export default NotificationMessage;