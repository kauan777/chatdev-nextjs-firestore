import { useContext } from "react";
import { NewMessageContext } from "../contexts/newMessageContext";

export function useNotification(){
    const value = useContext(NewMessageContext)

    return value
}