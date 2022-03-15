import { createContext, ReactNode, useState } from "react"

  type newMessageContextType = {
    newMessage: boolean;
    setNewMessage: (newMessage: boolean) => void;
  }

  type newMessageContextProviderProps = {
      children: ReactNode;
  }

export const NewMessageContext = createContext({} as newMessageContextType) //iniciando o contexto com o valor de um objeto

export function NewMessageContextProvider(props: newMessageContextProviderProps){

  const [newMessage, setNewMessage] = useState(false);

    return(
        <NewMessageContext.Provider value={{newMessage, setNewMessage}}>
            {props.children}
        </NewMessageContext.Provider>
    )
}


