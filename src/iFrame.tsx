import React, {useEffect, forwardRef, ForwardedRef} from "react";

interface IFrameProps {
    ref: ForwardedRef<HTMLIFrameElement>;
  }

const html = `<html>
<body>
<div id="changeText" value="changeText">Hello Div</div>
<button value="replyButton" id="replyButton">Reply to parent</button>
<script>
// Get the button element
var button = document.getElementById("replyButton");

// click event listener
button.addEventListener("click", function() {
  console.log('sending message to parent');
  window.parent.postMessage('Message from Child. Listen to me!');
});
</script>
</body>
</html>`;

const IFrame = forwardRef<HTMLIFrameElement, IFrameProps>((prop,ref)=>{
    const iframeRef = ref as React.MutableRefObject<HTMLIFrameElement>;
    useEffect(()=>{
        console.log('mounted')
        iframeRef?.current?.contentWindow?.addEventListener('message',processMessage,false); 
        return () =>{
            console.log('unmounted')
            iframeRef?.current?.contentWindow?.removeEventListener('message',processMessage,false);
        } 
    },[iframeRef?.current])

    const processMessage = (event:MessageEvent)=>{
        console.log('iFrame Event Listener');
        if(event.origin !== 'http://localhost:8080') {
            return;
        }

        const node = document.createElement('div');
        const textNode = document.createTextNode(event?.data)
        node.appendChild(textNode);
        //iframeRef?.current?.appendChild(textNode);
        iframeRef?.current?.contentWindow?.document.body.appendChild(textNode);
        console.log(iframeRef?.current);
    }

    return(
    <div>
    <iframe id="1" {...prop} ref={ref} srcDoc={html}>
    </iframe>
    </div>
    )
})


export default IFrame;