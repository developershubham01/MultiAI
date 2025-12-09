import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Message from "./Message";

const MessageList = ({ messages, onCopy, copiedMessageId, endRef, isLoading }) => {
  return (
    <div className="messages-container custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="empty-state"
          >
            <div className="empty-content">
             <div className="empty-icon">
    <video
      src="/ai3.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="empty-video"
    />
  </div>
              <div className="empty-text">
                <h3>Welcome to MultiAI</h3>
                <p>Start chatting with your favorite AI provider.</p>
              </div>
            </div>
          </motion.div>
        )}

        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
          >
            <Message
              message={msg}
              onCopy={onCopy}
              copied={copiedMessageId === msg.id}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {isLoading && (
        <div className="loading-indicator">
          <div className="loading-dots">
            <div className="loading-dot" />
            <div className="loading-dot" />
            <div className="loading-dot" />
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
};

export default MessageList;
