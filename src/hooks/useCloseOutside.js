import { useEffect, useRef } from "react";


export function useCloseOutside({keepOpen}){

    const ref = useRef();

    useEffect(()=>{
    
        function handleClick(e){
    
          if(ref.current && !ref.current.contains(e.target)){
    
            console.log("closing")
            keepOpen(false);
          }
        }
    
        document.addEventListener('click',handleClick, true);
    
        return ()=>document.removeEventListener('click', handleClick, true);    
      },[keepOpen])

      return ref;
}