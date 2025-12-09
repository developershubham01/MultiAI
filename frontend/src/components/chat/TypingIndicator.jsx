import React from "react";
import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <div className="typing-avatar avatar avatar-ai">
        <Bot />
      </div>

      <div className="typing-bubble message-bubble message-bubble-ai">
        <div className="typing-dots">
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
