import React from 'react'
import "./Chat.css";

const Chat = () => {
  return (
    <div className='chatOuter'>
      <a
        href="https://wa.me/2348100000000"
        // href=""
        class="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa fa-whatsapp whatsapp-icon"></i>
      </a>
    </div>
  )
}

export default Chat