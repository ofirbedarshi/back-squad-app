import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// #region agent log
window.addEventListener('error', (event) => {
  fetch('http://127.0.0.1:7426/ingest/4a83feaa-631d-41d5-8558-e70907ee82ba',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'16f59f'},body:JSON.stringify({sessionId:'16f59f',location:'main.tsx:onerror',message:'uncaught error',data:{message:event.message,filename:event.filename},timestamp:Date.now(),hypothesisId:'H-B'})}).catch(()=>{});
});
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason instanceof Error ? event.reason.message : String(event.reason);
  fetch('http://127.0.0.1:7426/ingest/4a83feaa-631d-41d5-8558-e70907ee82ba',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'16f59f'},body:JSON.stringify({sessionId:'16f59f',location:'main.tsx:unhandledrejection',message:'unhandled rejection',data:{reason},timestamp:Date.now(),hypothesisId:'H-B'})}).catch(()=>{});
});
// #endregion

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
