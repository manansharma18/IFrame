import React, {useEffect, forwardRef, ForwardedRef} from "react";

interface IFrameProps {
    ref: ForwardedRef<HTMLIFrameElement>;
  }

const html = `<html>
<body>
<div>Hello Div</div>
<button value="replyButton" id="replyButton">Reply to parent</button>
<script>
// Get the button element
var button = document.getElementById("replyButton");

// Add click event listener
button.addEventListener("click", function() {
  // Function to perform when the button is clicked
  console.log('sending message to parent');
  window.postMessage('Message from Child. Listen to me!');
  // You can add more functionality here, like replying to the parent element
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
    }

    return(
    <div>
    <iframe id="1" {...prop} ref={ref} srcDoc={html}>
    </iframe>
    </div>
    )
})


export default IFrame;