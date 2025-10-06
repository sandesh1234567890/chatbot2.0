
import React, { ReactNode } from 'react';
import { ChatRole } from '../types';
import type { ChatMessage as ChatMessageType } from '../types';
import { BotIcon, UserIcon } from './IconComponents';

interface ChatMessageProps {
  message: ChatMessageType;
  children?: ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, children }) => {
  const isUser = message.role === ChatRole.USER;
  const content = message.parts.map(part => part.text).join("");

  const containerClasses = isUser
    ? 'flex items-start gap-3 justify-end'
    : 'flex items-start gap-3';

  const bubbleClasses = isUser
    ? 'bg-cyan-600 text-white'
    : 'bg-slate-700 text-slate-200';
  
  const icon = isUser 
    ? <UserIcon className="w-7 h-7 p-1 bg-slate-600 text-slate-300 rounded-full" /> 
    : <BotIcon className="w-7 h-7 p-1 bg-slate-800 text-cyan-400 rounded-full" />;

  return (
    <div className={containerClasses}>
      {!isUser && icon}
      <div
        className={`max-w-xl rounded-2xl p-4 shadow-md ${bubbleClasses}`}
      >
        <div className="prose prose-invert prose-p:my-0 prose-pre:my-0 whitespace-pre-wrap break-words">
            {children ? children : content}
        </div>
      </div>
      {isUser && icon}
    </div>
  );
};

export default ChatMessage;
