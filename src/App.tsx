import React,{useEffect,useState, useRef} from "react";
import IFrame from "./iFrame";
      
const App: React.FC = () => {
    const [parentContent, setParentContent] = useState('');

    const refs = useRef<HTMLIFrameElement>(null);
    
    // useEffect(()=>{
    //     window.addEventListener('message',processMessage,false)
    //     return ()=>window.removeEventListener('message',processMessage);
    // },[])

    const processMessage = (event:MessageEvent)=>{
        if(event.origin !== 'http://localhost:8080') {
            return;
        }
        setParentContent(event.data);
        console.log('parent Event Listener');
    }

    const buttonClick = (event:React.MouseEvent) => {
        event.stopPropagation();
     if(refs.current === null) {
       return;
     }
     
     refs?.current?.contentWindow?.postMessage('Message from parent','*');
    }
    return (
    <> 
    
    <button onClick={buttonClick} style={{"display":"block"}}>Send message to child</button>
    <IFrame ref={refs}/>
    </>
    );
};

export default App;