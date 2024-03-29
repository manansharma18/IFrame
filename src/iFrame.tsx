import React,{useEffect, useState, ForwardedRef} from "react";
import { forwardRef } from "react";

interface IFrameProps {
    ref: ForwardedRef<HTMLIFrameElement>;
  }

const IFrame = forwardRef<HTMLIFrameElement, IFrameProps>((prop,ref)=>{
    const [content, setContent] = useState('');
    useEffect(()=>{
        const iframeRef = ref as React.MutableRefObject<HTMLIFrameElement>;
        iframeRef?.current?.contentWindow?.addEventListener('message',processMessage,false); 
        return () =>iframeRef?.current?.contentWindow?.removeEventListener('message',processMessage,false); 
    },[])

    const processMessage = (event:MessageEvent)=>{
        console.log('iFrame Event Listener');
        if(event.origin !== 'http://localhost:8080') {
            return;
        }
        setContent(event.data);
    }

    const replyToParent = (event:React.MouseEvent) =>{
        event.stopPropagation();
        console.log('sending message to parent');
        window.postMessage('Message from Child. Listen to me!');
    }

    return(
    <div>
    <iframe id="1" {...prop} ref={ref} srcDoc={content}>
    </iframe>
    <button onClick={replyToParent}>Reply to parent</button>
    </div>
    )
})


export default IFrame;