import React, { useEffect, useRef } from 'react';
import type { ChatMessage as ChatMessageType } from '../types';
import ChatMessage from './ChatMessage';
// Fix: Import ChatRole to fix type error and enable correct logic.
import { ChatRole } from '../types';

interface ChatHistoryProps {
  messages: ChatMessageType[];
  isLoading: boolean;
}

const TypingIndicator: React.FC = () => (
  <div className="flex items-center justify-center space-x-1.5 p-4">
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
  </div>
);

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {messages.map((msg, index) => {
        // Fix: The original code for the typing indicator had a type error and incorrect logic.
        // This updated logic correctly displays the typing indicator inside the model's empty
        // message placeholder while awaiting a streamed response.
        const isLastMessage = index === messages.length - 1;
        const isModelMessage = msg.role === ChatRole.MODEL;
        const isMessageEmpty = msg.parts.every((part) => !part.text.trim());

        if (isLoading && isLastMessage && isModelMessage && isMessageEmpty) {
          return (
            <ChatMessage key={index} message={msg}>
              <TypingIndicator />
            </ChatMessage>
          );
        }
        return <ChatMessage key={index} message={msg} />;
      })}
      <div ref={endOfMessagesRef} />
    </main>
  );
};

export default ChatHistory;
