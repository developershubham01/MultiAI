import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ChatInput = ({ onSend, disabled, placeholder }) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="input-container"
    >
      <div className="input-wrapper">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="textarea custom-scrollbar"
          rows="1"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className={`send-button ${
            !value.trim() || disabled
              ? "send-button-disabled"
              : "send-button-enabled"
          }`}
        >
          <Send />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatInput;
