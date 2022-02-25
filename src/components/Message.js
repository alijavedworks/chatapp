import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

function Message({ msg, user1, chat }) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
      <p className={msg.from === user1 ? "me" : "friend"}>
        {msg.from === user1 ? (
          <span className="message_name">Me: </span>
        ) : (
          <span className="message_name">{chat.name}: </span>
        )}
        {msg.text}
      </p>
      <div>
        <small className="time">
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </div>
    </div>
  );
}

export default Message;
