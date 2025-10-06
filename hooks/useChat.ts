
import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage } from '../types';
import { ChatRole } from '../types';

export const useChat = (systemInstruction: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    const initializeChat = () => {
      try {
        if (!process.env.API_KEY) {
          throw new Error("API_KEY environment variable not set.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: systemInstruction,
          },
        });
        setMessages([]); // Clear messages when system instruction changes
        setError(null);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred during initialization.');
        }
      }
    };
    initializeChat();
  }, [systemInstruction]);

  const sendMessage = useCallback(async (messageText: string) => {
    if (!chatRef.current) {
        setError("Chat is not initialized.");
        return;
    }

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      role: ChatRole.USER,
      parts: [{ text: messageText }],
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Add a placeholder for the bot's response
    const botMessagePlaceholder: ChatMessage = {
      role: ChatRole.MODEL,
      parts: [{ text: "" }],
    };
    setMessages(prev => [...prev, botMessagePlaceholder]);

    try {
      const result = await chatRef.current.sendMessageStream({ message: messageText });
      
      let accumulatedText = "";
      for await (const chunk of result) {
        const chunkText = chunk.text;
        if(chunkText) {
            accumulatedText += chunkText;
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === ChatRole.MODEL) {
                    lastMessage.parts = [{ text: accumulatedText }];
                }
                return newMessages;
            });
        }
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
       setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === ChatRole.MODEL) {
              lastMessage.parts = [{ text: `Error: ${errorMessage}` }];
          }
          return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, sendMessage, isLoading, error };
};
