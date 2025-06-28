'use client';
import { useState } from 'react';

export default function ChatComponent() {
  const [messages, setMessages] = useState([{ role: 'system', text: 'You are a helpful assistant.' }]);
  const [input, setInput] = useState('');

  const send = async () => {
    if (!input.trim()) return;
    const updated = [...messages, { role: 'user', text: input }];
    setMessages(updated);
    setInput('');
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: updated.map(m => ({ role: m.role, content: m.text })) }),
    });
    const { reply } = await res.json();
    setMessages([...updated, { role: 'bot', text: reply }]);
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.filter(m => m.role !== 'system').map((m, i) => (
          <div key={i} className={m.role}>{m.text}</div>
        ))}
      </div>
      <div className="chat-input">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your question..." />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
