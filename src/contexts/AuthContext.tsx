import { signIn, useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react"
import { auth } from "../services/firebase"

type User = {
    id: string;
    name: string;
    avatar: string;
    }
    
    type AuthContextType = {
      user: User | undefined;
      handleSignIn: () => Promise<void>
      signOut: () => void;
    }

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType) //iniciando o contexto com o valor de um objeto

export function AuthContextProvider(props: AuthContextProviderProps){


    const [user, setUser] = useState<User>() 

  useEffect(()=>{
    const { data } = useSession()
    console.log(data)

  }, []) 

  async function handleSignIn(){
    
        signIn("github")

        const { data } = useSession()

            setUser({
              id: "uid",
              name: "displayName",
              avatar: "photoURL"
            })
        }

  function signOut(){
    //auth.signOut()
    //setUser(undefined);
  }

    return(
        <AuthContext.Provider value={{user, handleSignIn, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}