import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Image as ImageIcon, Calendar, Users } from 'lucide-react';
import { useConciergeStore } from '../../store/conciergeStore';
import { format } from 'date-fns';

interface ConciergeChatProps {
  requestId: string;
}

const ConciergeChat: React.FC<ConciergeChatProps> = ({ requestId }) => {
  const { activeRequest, sendMessage } = useConciergeStore();
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [activeRequest?.messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(requestId, newMessage, 'client');
    setNewMessage('');
  };

  if (!activeRequest) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-600" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium">Your Concierge</h3>
            <p className="text-sm text-neutral-600">
              {activeRequest.assignedConcierge?.name}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center text-sm text-neutral-600">
          <Calendar className="w-4 h-4 mr-1" />
          Request created {format(new Date(activeRequest.createdAt), 'MMM d, yyyy')}
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {activeRequest.messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.senderType === 'client' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.senderType === 'client'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100'
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <p className={`text-xs mt-1 ${
                message.senderType === 'client'
                  ? 'text-primary-100'
                  : 'text-neutral-500'
              }`}>
                {format(new Date(message.timestamp), 'h:mm a')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full">
            <ImageIcon className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${
              newMessage.trim()
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-neutral-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConciergeChat;
