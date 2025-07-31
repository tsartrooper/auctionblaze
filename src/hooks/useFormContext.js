import React from "react";
import { FormContext } from "../components/ui/Form";



export default function useFormContext(){
    const formContext = React.useContext(FormContext);

    if(formContext === undefined)
        throw Error("The useFormContext hook must be used inside a FormContext.Provider")

    return formContext;
}
