
import React, { useState } from 'react';
import { useChat } from './hooks/useChat';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [systemInstruction, setSystemInstruction] = useState(
    'You are a helpful and friendly AI assistant. Be concise and clear in your responses.'
  );

  const { messages, sendMessage, isLoading, error } = useChat(systemInstruction);

  const handleSaveSettings = (newInstruction: string) => {
    setSystemInstruction(newInstruction);
    setIsSettingsOpen(false);
    // Optionally, you could clear messages here or start a new chat session in useChat
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white font-sans">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      <ChatHistory messages={messages} isLoading={isLoading} />
      {error && (
        <div className="px-4 py-2 text-red-400 bg-red-900/50 text-center">
          Error: {error}
        </div>
      )}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        initialInstruction={systemInstruction}
      />
    </div>
  );
};

export default App;
