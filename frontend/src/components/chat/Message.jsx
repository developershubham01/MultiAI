import React from "react";
import { Bot, User, Copy, CheckCheck } from "lucide-react";
import { formatTime } from "../../utils/formatTime";

const Message = ({ message, onCopy, copied }) => {
  const isUser = message.role === "user";

  return (
    <div className={`message ${isUser ? "message-user" : "message-ai"}`}>
      <div
        className={`avatar ${
          isUser
            ? "avatar-user"
            : message.isError
            ? "avatar-error"
            : "avatar-ai"
        }`}
      >
        {isUser ? <User /> : <Bot />}
      </div>

      <div
        className={`message-bubble ${
          isUser
            ? "message-bubble-user"
            : message.isError
            ? "message-bubble-error"
            : "message-bubble-ai"
        }`}
      >
        <div className="bubble-content">
          <div className="message-text">{message.content}</div>

          <div className="message-meta">
            <div className="meta-left">
              <span>{message.provider}</span>
              {message.model && (
                <>
                  <span>•</span>
                  <span>{message.model}</span>
                </>
              )}
            </div>
            <span>{formatTime(message.timestamp)}</span>
          </div>

          {message.usage?.promptTokens != null && (
            <div className="usage-stats">
              <span>
                Tokens:
                {" "}
                {(message.usage.promptTokens || 0) +
                  (message.usage.completionTokens || 0)}
              </span>
              <span>Prompt: {message.usage.promptTokens || 0}</span>
              <span>Completion: {message.usage.completionTokens || 0}</span>
            </div>
          )}
        </div>

        <button
          className="copy-button"
          onClick={() => onCopy(message.content, message.id)}
        >
          {copied ? <CheckCheck /> : <Copy />}
        </button>
      </div>
    </div>
  );
};

export default Message;
