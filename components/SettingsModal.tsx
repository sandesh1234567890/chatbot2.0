
import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (instruction: string) => void;
  initialInstruction: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialInstruction,
}) => {
  const [instruction, setInstruction] = useState(initialInstruction);

  useEffect(() => {
    setInstruction(initialInstruction);
  }, [initialInstruction]);
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(instruction);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg m-4 border border-slate-700 transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Custom Instructions</h2>
          <p className="text-slate-400 mt-1">
            Define the bot's personality and behavior. This instruction will be used to start new chats.
          </p>
        </div>
        <div className="p-6">
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            rows={8}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g., You are a pirate who speaks in rhymes..."
          />
        </div>
        <div className="flex justify-end gap-4 p-6 bg-slate-900/50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-slate-200 bg-slate-700 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg text-white bg-cyan-600 hover:bg-cyan-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
          >
            Save and Restart Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
