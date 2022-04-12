import { useContext } from "react";
import { NewMessageContext } from "../contexts/NewMessageContext";

export function useNotification(){
    const value = useContext(NewMessageContext)

    return value
}