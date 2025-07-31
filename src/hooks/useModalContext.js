import React from "react";
import { ModalContext } from "../components/ui/Modal";



export default function useModalContext(){
    const modalContext = React.useContext(ModalContext);

    if(modalContext === undefined) 
        throw new Error("The useModalContext hook must be used inside a ModalContext.Provider");
    
    return modalContext;
}