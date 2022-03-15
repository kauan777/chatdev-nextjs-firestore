import { collection, getDocs, onSnapshot, query} from "firebase/firestore";
import { db } from "./firebase";

const MessagingService = {

    async getMessages() {
        let messages: Object[] = []
        const queryMessages = await getDocs(collection(db, "messages"));
        queryMessages.forEach( (doc) => {
           messages.push(doc.data())
        })
        return messages
      },

      observeMessages() {
        const q = query(collection(db, "messages"));
        const unsubscribe =  onSnapshot(q, (querySnapshot) => {
          const messages: String[] = [];
          querySnapshot.forEach((doc: any) => {
            messages.push(doc.data().message);
          });
          // console.log("Current cities in CA: ", cities.join(", "));
        });
      } 
}

export default MessagingService;




